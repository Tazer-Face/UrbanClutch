import { AppError } from "../../Utils/ErrorClass.js";
import mongoose from "mongoose";
import { razorpay } from "../../Config/RazorpayObj.js";

class PaymentOrderFailureS{
    constructor(userRepository1, userRepository2){
        this.userRepository1 = userRepository1;
        this.userRepository2 = userRepository2;
    }


    //async paymentOrderFailure(id,deleteRes)

    async paymentOrderFailure(id,claimId = null){

        const session = await mongoose.startSession();
        
        try{

            session.startTransaction();

            let data ;

            if(claimId !== null){
                id.claimId = claimId;
                data = await this.userRepository1.getReservation(id);
            }else{
                data = await this.userRepository1.getReservation(id);
            }

            

            if(!data || data.length === 0){
               throw new AppError("Reservation doesnt exist",404,data);
            }

            let paymentDetails = await razorpay.orders.fetch(data[0].RazorPayOrderId);

            let paymentStatus = paymentDetails.status;

            if(paymentStatus !== "paid"){

                let cartData = data[0].OrderDetails.map(({productId,sizes})=>(
                    {  productId,
                        sizes}
                ))

                let operations = cartData.flatMap(({productId, sizes}) => {
                    return Object.entries(sizes).map(([key, value]) => {
                        
                        return {
                            updateOne: {
                                filter: {
                                    productId : productId
                                },
                                update: {
                                    $inc: {
                                        [`inventory.${key}`]: +value
                                    }
                                }
                            }
                        };
                    });
                });
        
                
                let updateProduct = await this.userRepository2.updateProductData(operations,{ session });
                

                if (operations.length !== updateProduct.modifiedCount) {
                    throw new AppError("Failed to update product inventory", 500,updateProduct);
                }
                
                let updateReservation ;
                
                
                // if(deleteRes){
                //     deleteReservation = await this.userRepository1.deleteReservation(id,session);
                // }else{
                //     updateReservation = await this.userRepository1.updateReservation(id,{state : "Verify"},session);
                // } 

                if(claimId !== null){
                    updateReservation = await this.userRepository1.updateReservation(id,{state : "Rejected" , claimId : "" ,claimExpiresAt: null  },session);;
                }else{
                    updateReservation = await this.userRepository1.updateReservation(id,{state : "Rejected"},session);
                }

                if( updateReservation.state !== "Rejected" ){
                        throw new AppError("Unable to update reservation", 500 ,updateReservation);
                }
            
                
                // if(deleteRes){
                //     if( !deleteReservation.acknowledged ){
                //         throw new AppError("Unable to delete reservation", 500 ,updateReservation);
                //     }
                // }else{
                //     if( updateReservation.state !== "Verify" ){
                //         throw new AppError("Unable to update reservation", 500 ,updateReservation);
                //     }
                // }
            
            }else if(paymentStatus === "paid"){
                let updateReservationState = await this.userRepository1.updateReservation(id,{state : "Verify" ,payment : "Success" },session);
                if( updateReservationState.state !== "Verify" && updateReservationState.payment !== "Success"){
                    throw new AppError("Unable to update reservation", 500 ,updateReservationState);
                }
            }

            await session.commitTransaction();

            
            //return updateReservation;
        }
        catch(err){

            await session.abortTransaction();

            if (err instanceof AppError) {
                throw err;
            }

            throw new AppError(
                "Unable to create order",
                500,
                err
            );
        }
        finally{
            session.endSession();
        }
    }
}

export default PaymentOrderFailureS