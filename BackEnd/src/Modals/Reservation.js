import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
    {
       
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
                        L:  {
                                type: Number,
                                min: 0
                        }
                    }
                }
            ],
            default: []
        },

        expiresAt: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model(
    "Reservation",
    reservationSchema
);