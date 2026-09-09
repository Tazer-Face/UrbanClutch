import { AppError } from "../../Utils/ErrorClass.js";
import mongoose from "mongoose";

class PaymentOrderFailureS{
    constructor(userRepository1, userRepository2){
        this.userRepository1 = userRepository1;
        this.userRepository2 = userRepository2;
    }


    

    async paymentOrderFailure(reservationId){

        const session = await mongoose.startSession();
        
        try{

            session.startTransaction();

            let data = await this.userRepository1.getReservation(reservationId);

            if(!data || data.length === 0){
                return new AppError("Reservation doesnt exist",404,data);
            }
            
            console.log(data)
 
            let cartData = data[0].OrderDetails.map(({productId,sizes})=>(
                 {  productId,
                    sizes}
            ))

            console.log(cartData)



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
                
            console.log(operations.length);
            console.log(JSON.stringify(operations));

            
            let updateProduct = await this.userRepository2.updateProductData(operations,{ session });
            

            if (operations.length !== updateProduct.modifiedCount) {
                throw new AppError("Failed to update product inventory", 500,updateProduct);
            }
            

            let deleteReservation = await this.userRepository1.deleteReservation(reservationId,{session});

            if( !deleteReservation.acknowledged ){
                throw new AppError("Unable to delete reservation", 500 ,deleteReservation);
            }

            await session.commitTransaction();

            
            return deleteReservation;
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