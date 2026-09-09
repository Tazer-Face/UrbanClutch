import express from 'express';
const Router = express.Router();
import { getDataController ,createOrderDataController } from '../Container/UrbanClutchContainer.js';



Router.get('/productData', getDataController.fetchData.bind(getDataController));
Router.post('/orderData', createOrderDataController.addOrder.bind(createOrderDataController));
Router.get('/events/products', createOrderDataController.addOrder.bind(createOrderDataController));


export default Router;