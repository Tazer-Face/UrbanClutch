import mongoose from 'mongoose';

const OrdersSchema = new mongoose.Schema(
    {
        FirebaseUid :{
            type: String,
            required: true
        },

        RazorPayOrderId : {
            type: String,
            required: true,
            unique : true
        },

        Total : Number,

        UserData : {
            
            Name : {
                type: String,
                required: true
            },

            Address : {
                type: String,
                required: true
            },

            State : {
                type: String,
                required: true
            },

            City : {
                type: String,
                required: true
            },

            PinCode: {
                type: String,
                required: true,
                match: /^\d{6}$/
            },

            Email: {
                type: String,
                match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            PhoneNo: {
                type: String,
                required: true,
                match: /^\d{10}$/
            }
        },

        OrderDetails: {
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

        ,
        status: {
                type: String,
                enum: ["Received","Confirmed", "Packed", "InTransit", "OutForDelivery" , "Delivered"],
                default: "Received"
        },
    },
    {
        timestamps: true
    }
);


export default mongoose.model('Order', OrdersSchema);


