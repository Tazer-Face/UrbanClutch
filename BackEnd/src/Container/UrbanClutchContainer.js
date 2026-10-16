import GetProductDataS from "../Services/GetProductDataService.js";
import CreateOrderDataS from "../Services/Orders/CreateOrderService.js";
import CreateReservationDataS from '../Services/Orders/CreateReservationService.js'
import CalculateToTalS from "../Services/Payments/CalculateTotalService.js"
import CreateRazerPayDataS from "../Services/Payments/CreateRazerpayObjService.js"
import PaymentOrderFailureS from "../Services/Payments/PaymentOrderFailureService.js"
import UpdateCreateUserDetailsS from "../Services/UserCart/UserLogin.js";
import CreateUserDetailsS from "../Services/UserCart/CreateUserDetails.js";
import MergeUserCartS from "../Services/UserCart/MergeUserCart.js";
import UpdateUserDetailsS from "../Services/UserCart/UserLogout.js";
import VerifyPaymentS from "../Services/Payments/VerifyPaymentService.js";
import VerifyReservationS from "../Services/Jobs/ValidateReservationService.js";

import { FetchProductDetails } from "../Controller/FetchProductDataApi.js";
import { CreateOrder } from "../Controller/CreateOrderApi.js";
import { UpdateCreateUserDetailsOnLogin } from "../Controller/UserCartOnLogin.js";
import { UpdateUserDetailsOnLogout } from "../Controller/UserCartOnLogout.js";
import { VerifyOrder } from "../Controller/verifyOrderApi.js";

import { MongoDbReservationRepository } from "../Repository/MongoDb/ReservationDataImp.js";
import { MongoDbProductRepository } from "../Repository/MongoDb/ProductDataImp.js";
import { MongoDbUserRepository } from "../Repository/MongoDb/UserDataImp.js";
import { MongoDbOrderRepository } from "../Repository/MongoDb/OrderDataImp.js";

import { ValidateReservationJob } from "../Jobs/ValidateReservation.js";


//Repo

const DataRepo = new MongoDbProductRepository()
const ReservationRepo = new MongoDbReservationRepository()
const UserRepo = new MongoDbUserRepository()
const OrderRepo = new MongoDbOrderRepository()

// Service 

const getProductDataService = new GetProductDataS(DataRepo)
const createReservationDataService = new CreateReservationDataS(DataRepo,ReservationRepo)
const totalAmountService = new CalculateToTalS(ReservationRepo,DataRepo)
const paymentOrderFailureService = new PaymentOrderFailureS(ReservationRepo,DataRepo)
const createUserDetailsService = new CreateUserDetailsS(DataRepo,UserRepo)
const mergeUserCartService = new MergeUserCartS(DataRepo,UserRepo,OrderRepo)
const updateUserDetailsService = new UpdateUserDetailsS(DataRepo,UserRepo)

// Service using services


const createRazerPayObjService = new CreateRazerPayDataS(totalAmountService)
const createOrderDataService = new CreateOrderDataS(createReservationDataService,createRazerPayObjService,paymentOrderFailureService,ReservationRepo,UserRepo)
const updateCreateUserDetailsService = new UpdateCreateUserDetailsS(UserRepo,createUserDetailsService,mergeUserCartService)
const verifyPaymentService = new VerifyPaymentS(paymentOrderFailureService,ReservationRepo,OrderRepo,UserRepo)
const validateReservationsService = new VerifyReservationS(paymentOrderFailureService,ReservationRepo,OrderRepo)

// Controller 

export const getDataController = new FetchProductDetails(getProductDataService)
export const createOrderDataController = new CreateOrder(createOrderDataService,createRazerPayObjService)
export const updateCreateUserDetailsController = new UpdateCreateUserDetailsOnLogin(updateCreateUserDetailsService)
export const updateUserDetailsController = new UpdateUserDetailsOnLogout(updateUserDetailsService)
export const verifyOrderController = new VerifyOrder(verifyPaymentService)

// Jobs

export const validateReservationsJob = new ValidateReservationJob(validateReservationsService)