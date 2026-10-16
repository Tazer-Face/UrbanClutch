import Razorpay from "razorpay";
import dotenv from 'dotenv';
import { AppError } from "../../Utils/ErrorClass.js";
dotenv.config()

import crypto from "crypto";
import mongoose from "mongoose";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});




class VerifyPaymentS{

    constructor(Service1,userRepository1,userRepository2,userRepository3){
        this.Service1 = Service1;
        this.userRepository1 = userRepository1;
        this.userRepository2 = userRepository2;
        this.userRepository3 = userRepository3;
    }

    async verifyPayment(data){

        let session = await mongoose.startSession();
        let paymentStatus = true;
        let reservation;
        try{

            session.startTransaction();

            reservation = await this.userRepository1.getReservation({RazorPayOrderId : data.razorpay_order_id});
  

            if(reservation.length === 0){
                throw new AppError("Order id mismatch , cannot find related reservation",400,reservation)
            }
            
            let verifiedSignature = crypto
                                    .createHmac("SHA-256",process.env.RAZORPAY_SECRET_KEY)
                                    .update(reservation[0].RazorPayOrderId+"|"+data.razorpay_payment_id)
                                    .digest("hex")
            
            
            if(verifiedSignature !== data.razorpay_signature){
                paymentStatus = false;
                throw new AppError("Payment unsuccessful",500)
            }


            console.log(paymentStatus);
            

            let orderData = {
                FirebaseUid : reservation[0].FirebaseUid,
                RazorPayOrderId : reservation[0].RazorPayOrderId,
                Total : reservation[0].Total,
                UserData : reservation[0].UserDetails,
                OrderDetails : reservation[0].OrderDetails,
                status : "Confirmed"
            }


            let orders = await this.userRepository2.placeOrder([orderData],session);


            if(orders[0].status != "Confirmed"){
                throw new AppError("Order not created",500,orders)
            }

            let updateReservation = await this.userRepository1.updateReservation({_id : reservation[0]._id},{state : "Closed"},session);

            if( updateReservation.state !== "Closed" ){
                throw new AppError("Unable to close reservation", 500 ,updateReservation);
            }

            let userDetails = {userObj : {uid : reservation[0].FirebaseUid },userDetails : { cart : []}};

            let updateUser = await this.userRepository3.updateUser(userDetails)  
            
             if(!updateUser){
                throw error;
            }

            let existingOrders = await this.userRepository2.getOrders({FirebaseUid : reservation[0].FirebaseUid});

            console.log(existingOrders)

            orders.push(...existingOrders)

            await session.commitTransaction();

            return orders;
        }
        catch(err){
            console.error(err)
            await session.abortTransaction();

            if(!paymentStatus){

                try{
                    await this.Service1.paymentOrderFailure({_id : reservation[0]._id})
                    console.log("Reservation updates have been undone")
                }catch(err){
                    throw err
                }
                
            }else{
                try{
                    await this.userRepository1.updateReservation({_id : reservation[0]._id},{state : "Verify"});
                    console.log("Reservation state has been changed")
                }catch(err){
                    throw err
                }
                
            }

            if (err instanceof AppError) {
                throw err;
            }

            throw new AppError(
                "Unable to verify/create order",
                500,
                err
            );
        }
    }
}

export default VerifyPaymentS