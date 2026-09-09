//import routes from './Routes/TradingLogsRoutes.js';
import express from 'express';
import cors from "cors";
import {connect,disconnect} from './Config/MongoDbConnections.js'
import routes from './Routes/UrbanClutchRoutes.js';
import {errorHandler} from './Middleware/ErrorHandler.js'
import {startProducteventStream} from './SSE/ProductEventStream.js'

import dotenv from 'dotenv';
dotenv.config()

const app = express();
 
connect();

startProducteventStream();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

process.on('SIGINT', async () => {
    await disconnect();
});
process.on('SIGTERM', async () => {
    await disconnect();
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})