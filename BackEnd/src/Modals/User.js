import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    FirebaseUid :{
        type: String,
        required: true
    },

    UserData : {
        
        Name:  String ,

        Address : String,

        State:  String ,

        City: String,

        PinCode: {
            type: String,
            match: /^\d{6}$/
        },

        Email: {
            type: String,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        PhoneNo: {
            type: String,
            match: /^\d{10}$/
        }
    },

    cart: {
        type: [
            {
                productId: {
                     type: String,
                    required: true
                },

                sizes: {
                    S: {
                        type: Number,
                        min: 0
                    },
                    M: {
                        type: Number,
                        min: 0
                    },
                    L: {
                        type: Number,
                        min: 0
                    }
                }
            }
        ],
        default: []
    }  
    
})

export default mongoose.model("User",userSchema)