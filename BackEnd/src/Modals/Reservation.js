import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
    {
        FirebaseUid : {
            type: String,
            required: true
        },

        RazorPayOrderId :  String,

        CartSignature :  String,
        
        Total : Number,

        RazorPayObject  : Object,

        CheckoutKey  : String ,

        OrderCreationStatus : {
            type : String,
            enum : ["Creating","Created"]
        },

        UserDetails : {
        
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
        },

        state : {
            type : String,
            enum: ["Active","Claimed", "Closed","Rejected","Verify"],
            default: "Active"
        },

        claimId : String,

        claimExpiresAt : {
            type: Date
        },

        payment : {
            type : String,
            enum: ["Success","Failure",""],
            default: ""
        }

    },
    {
        timestamps: true
    }
);

reservationSchema.index(
  { FirebaseUid: 1 , CheckoutKey : 1 },
  {
    unique: true,
    partialFilterExpression: {
      OrderCreationStatus: "Created"
    }
  }
);

reservationSchema.index(
  { RazorPayOrderId: 1 }, 
  {
    unique: true, 
    partialFilterExpression: {
      RazorPayOrderId: { $type: "string" }
    }
  }
);

export default mongoose.model(
    "Reservation",
    reservationSchema
);