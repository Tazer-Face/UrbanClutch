import mongoose from 'mongoose';

const OrdersSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },

    Address: {
        type: String,
        required: true
    },

    State: {
        type: String,
        required: true
    },

    City: {
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
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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
                        default: 0,
                        min: 0
                    },
                    M: {
                        type: Number,
                        default: 0,
                        min: 0
                    },
                    L: {
                        type: Number,
                        default: 0,
                        min: 0
                    }
                }
            }
        ],
        default: []
    },

    PhoneNo: {
        type: String,
        required: true,
        match: /^\d{10}$/
    }

    ,
    status: {
            type: String,
            enum: ["Received","Confirmed", "Packed", "InTransit", "OutForDelivery" , "Delivered"],
            default: "Received"
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    }
});


export default mongoose.model('Order', OrdersSchema);


