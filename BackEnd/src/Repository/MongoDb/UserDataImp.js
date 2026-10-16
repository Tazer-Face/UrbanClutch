
import User from "../../Modals/User.js";
import UserDataAbs from "../Abstractions/UserDataAbs.js";

export class MongoDbUserRepository extends UserDataAbs {

    async addUser(data) {
        try {
            
             let result = await User.create({
                FirebaseUid : data.userObj.uid ,
                cart: data.userDetails.cart || ""
             });
            
             return result;
        }
        catch (error) {
            console.error("Error creating new user data", error);
            throw error;
        }

    }

    async getUser(uid) {
        try {
            
             let result = await User.findOne({
                FirebaseUid : uid
             }).lean();
            
             return result;
        }
        catch (error) {
            console.error("Error fetching user details", error);
            throw error;
        }

    }

    async updateUser(data) {
        try {

            let update = {}

            if(Object.keys(data.userDetails.userDetails || {}).length > 0){
                update.UserData = data.userDetails.userDetails;
                update.cart = data.userDetails.cart;
            }else{
                update.cart = data.userDetails.cart;
                
            }
            
            let result = await User.findOneAndUpdate(
                {
                    FirebaseUid : data.userObj.uid
                },
                {
                    $set : update
                },
                {
                     returnDocument: "after" 
                }
            );
            
             return result;
        }
        catch (error) {
            console.error("Error updating user details", error);
            throw error;
        }

    }

    
    
}
