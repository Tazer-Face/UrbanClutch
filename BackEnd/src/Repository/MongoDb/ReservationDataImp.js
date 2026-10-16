
import mongoose from "mongoose";
import Reservation from "../../Modals/Reservation.js";
import ReservationDataAbs from "../Abstractions/ReservationDataAbs.js";

export class MongoDbReservationRepository extends ReservationDataAbs {

    async createReservation(data,{session}) {
        try {

            
             let res = await Reservation.create(data,
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

    async deleteReservation(id,session=null) {
        try {
            
             let res = await Reservation.deleteOne(id,
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

    async getReservation(data) {
        try {
            
             let res = await Reservation.find(data).lean();
            
             return res;
        }
        catch (error) {
            console.error("Error getting reservation doc", error);
            throw error;
        }

    }

    async updateReservation(id,data,session=null) {
        try {
            
             let res = await Reservation.findOneAndUpdate(id,{$set : data}, {
                session,
                returnDocument: "after"
            });
            
             return res;
        }
        catch (error) {
            console.error("Error updating reservation doc", error);
            throw error;
        }

    }


    async updateManyReservation(filter,data) {
        try {
            
             let res = await Reservation.updateMany(filter,data);
            
             return res;
        }
        catch (error) {
            console.error("Error updating reservation doc", error);
            throw error;
        }

    }

    // async getAllReservations() {
    //     try {
            
    //          let res = await Reservation.find().lean();
            
    //          return res;
    //     }
    //     catch (error) {
    //         console.error("Error getting reservation doc", error);
    //         throw error;
    //     }

    // }

    
    
}
