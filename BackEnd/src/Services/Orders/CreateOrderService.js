import { AppError } from "../../Utils/ErrorClass.js";

class CreateOrderDataS{
    constructor(Service1,Service2,Service3){
        this.Service1 = Service1;
        this.Service2 = Service2;
        this.Service3 = Service3;
    }


    

    async createOrder(orderData){

        let reservationId;
        
        try{

            // let transformedData = {
            //     Name: orderData.userDetails.name ,
            //     Address: orderData.userDetails.address,
            //     State: orderData.userDetails.state,
            //     City: orderData.userDetails.city,
            //     PinCode: orderData.userDetails.pincode,
            //     Email: orderData.userDetails.email,
            //     OrderDetails: cartData,
            //     PhoneNo: orderData.userDetails.phone

            // }

            // let data = await this.userRepository2.placeOrder(transformedData,session);
            
            // if ( !data ){
            //     throw new AppError("Order not created", 500);
            // }


            let reservation = await this.Service1.createReservation(orderData)
            console.log("reservation successful")

            reservationId = reservation[0]._id;

            let payment = await this.Service2.CreateRazerpayObj(reservationId)
            
            return payment;
        }
        catch(err){

            if(reservationId){
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