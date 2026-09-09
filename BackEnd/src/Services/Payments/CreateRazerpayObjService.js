import Razorpay from "razorpay";
import dotenv from 'dotenv';
import { AppError } from "../../Utils/ErrorClass.js";
import mongoose from "mongoose";
dotenv.config()

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});




class CreateRazerPayDataS{

    constructor(userRepository1){
        this.userRepository1 = userRepository1;
    }


    

    async CreateRazerpayObj(reservationId){

        
        try{

 
            const total = await this.userRepository1.calculateTotal(reservationId);
            
            if(  total <= 0){
                throw new AppError("Unable to calculate total",500,total)
            }

            const razorpayOrder = await razorpay.orders.create({
                amount: total,
                currency: "INR",
                receipt: reservationId.toString()
            });

            return razorpayOrder;
        }
        catch(err){

            if (err instanceof AppError) {
                throw err;
            }

            throw new AppError(
                "Unable to create order",
                500,
                err
            );
        }
    }
}

export default CreateRazerPayDataS