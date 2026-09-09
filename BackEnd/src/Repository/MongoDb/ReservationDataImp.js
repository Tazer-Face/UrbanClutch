
import Reservation from "../../Modals/Reservation.js";
import ReservationDataAbs from "../Abstractions/ReservationDataAbs.js";

export class MongoDbReservationRepository extends ReservationDataAbs {

    async createReservation(data,{session}) {
        try {

            
             let res = await Reservation.create([{
                OrderDetails: data.OrderDetails ,
                status: data.status,
                expiresAt: data.expiresAt,

             }],
             {
                session
             });
            
             return res;
        }
        catch (error) {
            console.error("Error creating new reservation error", error);
            throw error;
        }

    }

    async deleteReservation(id,{session}) {
        try {

            
             let res = await Reservation.deleteOne({ _id: id},
             {
                session
             });
            
             return res;
        }
        catch (error) {
            console.error("Unable to delete rerservation", error);
            throw error;
        }

    }

    async getReservation(id) {
        try {

            
             let res = await Reservation.find({_id : id}).lean();
            
             return res;
        }
        catch (error) {
            console.error("Error getting reservation doc", error);
            throw error;
        }

    }

    
    
}
