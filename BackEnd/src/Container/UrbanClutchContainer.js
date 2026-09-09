import GetProductDataS from "../Services/GetProductDataService.js";
import CreateOrderDataS from "../Services/Orders/CreateOrderService.js";
import CreateReservationDataS from '../Services/Orders/CreateReservationService.js'
import CalculateToTalS from "../Services/Payments/CalculateTotalService.js"
import CreateRazerPayDataS from "../Services/Payments/CreateRazerpayObjService.js"
import PaymentOrderFailureS from "../Services/Payments/PaymentOrderFailureService.js"

import { FetchProductDetails } from "../Controller/FetchProductDataApi.js";
import { CreateOrder } from "../Controller/CreateOrderApi.js";

import { MongoDbReservationRepository } from "../Repository/MongoDb/ReservationDataImp.js";
import { MongoDbProductRepository } from "../Repository/MongoDb/ProductDataImp.js";




//Repo

const DataRepo = new MongoDbProductRepository()
const ReservationRepo = new MongoDbReservationRepository()

// Service 

const GetProductDataService = new GetProductDataS(DataRepo)
const createReservationDataService = new CreateReservationDataS(DataRepo,ReservationRepo)
const totalAmountService = new CalculateToTalS(ReservationRepo,DataRepo)
const paymentOrderFailureService = new PaymentOrderFailureS(ReservationRepo,DataRepo)

// Service using services


const createRazerPayObjServive = new CreateRazerPayDataS(totalAmountService)
const createOrderDataService = new CreateOrderDataS(createReservationDataService,createRazerPayObjServive,paymentOrderFailureService)

// Controller 

export const getDataController = new FetchProductDetails(GetProductDataService)
export const createOrderDataController = new CreateOrder(createOrderDataService,createRazerPayObjServive)