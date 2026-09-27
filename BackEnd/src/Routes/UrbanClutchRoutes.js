import express from 'express';
const Router = express.Router();
import { getDataController ,createOrderDataController } from '../Container/UrbanClutchContainer.js';
import { sseRouterMethod } from '../SSE/SseRouterMethod.js';



Router.get('/productData', getDataController.fetchData.bind(getDataController));
Router.post('/orderData', createOrderDataController.addOrder.bind(createOrderDataController));
Router.get('/events/products', sseRouterMethod);


export default Router;