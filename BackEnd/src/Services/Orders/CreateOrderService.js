import { AppError } from "../../Utils/ErrorClass.js";
import crypto from "node:crypto";
import { razorpay } from "../../Config/RazorpayObj.js";

class CreateOrderDataS{
    constructor(Service1,Service2,Service3,userRepository1,userRepository2){
        this.Service1 = Service1;
        this.Service2 = Service2;
        this.Service3 = Service3;
        this.userRepository1 = userRepository1;
        this.userRepository2 = userRepository2;
    }

    createSignature(data){
        let normalizedCart = Object.entries(data?.userDetails.cart).map(([id,sizes])=>(
                 { productId: id.toString(),
                    sizes :  Object.fromEntries( Object.entries(sizes).sort(([sizeA],[sizeB])=> sizeA.localeCompare(sizeB) ))}
        )).sort((a,b)=> a.productId.localeCompare(b.productId))

        const cartString = JSON.stringify(normalizedCart);

        return crypto
        .createHash("sha256")
        .update(cartString)
        .digest("hex");
    }


    

    async createOrder(orderData){

        let signature = this.createSignature(orderData)
        orderData.userDetails.CartSignature = signature;
        let reservationId = {};
        let idSignatureCheckout = {};
        idSignatureCheckout.FirebaseUid = orderData.userObj.uid;
        idSignatureCheckout.CartSignature = signature;
        idSignatureCheckout.CheckoutKey = orderData.userDetails.CheckoutKey;
        idSignatureCheckout.OrderCreationStatus = "Created"

        // idState.FirebaseUid = orderData.userObj.uid;
        // idState.state = "Active";

        
        try{
            
            let existingReservation = await this.userRepository1.getReservation(idSignatureCheckout);

            if(!existingReservation || existingReservation.length > 0){
                let now = new Date();
                let currentExpiry = new Date(existingReservation.expiresAt)
                let paymentStatus = await razorpay.orders.fetch(existingReservation.RazorPayOrderId)
                
                if(now - currentExpiry <= 9*6*1000 && paymentStatus.status !== "paid" ){
                    return existingReservation.RazorPayObject
                }else if(paymentStatus.status === "paid" ){
                    return  res.status(200).json({
                                status: "already_paid",
                                message: "This checkout has already been paid.",
                                orderId: existingReservation._id
                            });
                }
                //await this.Service3.paymentOrderFailure(idState)
            }

            let reservation = await this.Service1.createReservation(orderData)
            console.log("reservation successful")

            reservationId._id = reservation[0]._id

            let payment = await this.Service2.CreateRazerpayObj(reservationId._id);

            let updateRes = await this.userRepository1.updateReservation(reservationId,{RazorPayOrderId : payment.id , Total : ((payment.amount)/100) ,RazorPayObject : payment , OrderCreationStatus : "Created"});

            if(!updateRes){
                throw error;
            }

            let updateUser = await this.userRepository2.updateUser(orderData);

             if(!updateUser){
                throw error;
            }
            
            return payment;
        }
        catch(err){

            if(reservationId._id){
                await this.Service3.paymentOrderFailure(reservationId)
                console.log("Reservation updates have been undone")
            }

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

export default CreateOrderDataS