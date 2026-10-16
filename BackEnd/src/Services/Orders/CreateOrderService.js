import { AppError } from "../../Utils/ErrorClass.js";

class CreateOrderDataS{
    constructor(Service1,Service2,Service3,userRepository1,userRepository2){
        this.Service1 = Service1;
        this.Service2 = Service2;
        this.Service3 = Service3;
        this.userRepository1 = userRepository1;
        this.userRepository2 = userRepository2;
    }


    

    async createOrder(orderData){

        let reservationId = {};
        let idState = {};
        idState.FirebaseUid = orderData.userObj.uid;
        idState.state = "Active";
        try{
            
            let existingReservation = await this.userRepository1.getReservation(idState);

            if(!existingReservation || existingReservation.length > 0){

                await this.Service3.paymentOrderFailure(idState)

            }

            let reservation = await this.Service1.createReservation(orderData)
            console.log("reservation successful")

            reservationId._id = reservation[0]._id

            let payment = await this.Service2.CreateRazerpayObj(reservationId._id);

            let updateRes = await this.userRepository1.updateReservation(reservationId,{RazorPayOrderId : payment.id , Total : ((payment.amount)/100)});

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