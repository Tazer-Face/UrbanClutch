//import routes from './Routes/TradingLogsRoutes.js';
import express from 'express';
import cors from "cors";
import {connect,disconnect} from './Config/MongoDbConnections.js'
import routes from './Routes/UrbanClutchRoutes.js';
import {errorHandler} from './Middleware/ErrorHandler.js'
import {startEventStream} from './SSE/EventStream.js'
import { validateReservationsJob } from './Container/UrbanClutchContainer.js';
import cookieParser from "cookie-parser";

import dotenv from 'dotenv';
dotenv.config()

const app = express();
 
connect();


const {changeStreamProduct,changeStreamOrders,listen} = startEventStream();

listen();

validateReservationsJob.validateReservations();
app.use(cookieParser());
app.use(cors({
    origin : "https://urbanclutch.in" ,
    credentials: true
}));
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

process.on('SIGINT', async () => {
    await changeStreamProduct.close();
    await changeStreamOrders.close();
    await disconnect();
});
process.on('SIGTERM', async () => {
    
    await disconnect();
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
