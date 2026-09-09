import { AppError } from "../../Utils/ErrorClass.js";
import mongoose from "mongoose";

class CreateReservationDataS{
    constructor(userRepository1, userRepository2){
        this.userRepository1 = userRepository1;
        this.userRepository2 = userRepository2;
    }


    

    async createReservation(orderData){

        const session = await mongoose.startSession();
        
        try{

            session.startTransaction();
 
            let cartData = Object.entries(orderData.cartData).map(([id,sizes])=>(
                 { productId: id,
                    sizes}
            ))



            let operations = cartData.flatMap(({productId, sizes}) => {
                return Object.entries(sizes).map(([key, value]) => {
                    
                    return {
                        updateOne: {
                            filter: {
                                productId : productId,
                                [`inventory.${key}`]: { $gte: value }
                            },
                            update: {
                                $inc: {
                                    [`inventory.${key}`]: -value
                                }
                            }
                        }
                    };
                });
            });
                
            
            let updateProduct = await this.userRepository1.updateProductData(operations,{ session });
            

            if (operations.length !== updateProduct.modifiedCount) {
                throw new AppError("Failed to update product inventory", 500,updateProduct);
            }
            

            let createReservation = await this.userRepository2.createReservation({
                OrderDetails: cartData,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now
            },{session});

            if( !createReservation ){
                throw new AppError("Reservation not created", 500 ,createReservation);
            }

            await session.commitTransaction();

            
            return createReservation;
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

export default CreateReservationDataS