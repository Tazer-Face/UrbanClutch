import express from 'express';
const Router = express.Router();
import { getDataController ,createOrderDataController,updateCreateUserDetailsController,updateUserDetailsController,verifyOrderController } from '../Container/UrbanClutchContainer.js';
import { sseRouterMethod } from '../SSE/SseRouterMethod.js';
import { AuthenticateUser } from '../Middleware/AuthenticateUser.js';
import { ValidateReqBody } from '../Middleware/ValidateBody.js';



Router.get('/productData', getDataController.fetchData.bind(getDataController));
Router.post('/orderData',AuthenticateUser, createOrderDataController.addOrder.bind(createOrderDataController));
Router.get('/events', sseRouterMethod);
Router.post('/userDetails',AuthenticateUser, updateCreateUserDetailsController.createUpdateUser.bind(updateCreateUserDetailsController));
Router.patch('/userDetails',AuthenticateUser, updateUserDetailsController.updateUserDetails.bind(updateUserDetailsController));
Router.post('/verifyOrder',ValidateReqBody, verifyOrderController.verifyOrder.bind(verifyOrderController));


export default Router;