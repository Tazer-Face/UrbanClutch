import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();


const uri = process.env.MONGO_URI;

export const connect = async () => {
    try{
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    }
    catch(err){
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
}

export const disconnect = async () => {
    try{
        await mongoose.disconnect();
        console.log("MongoDB disconnected successfully");
        process.exit(0);
    }
    catch(err){
        console.error("MongoDB disconnection error:", err);
        process.exit(1);
    }
}
