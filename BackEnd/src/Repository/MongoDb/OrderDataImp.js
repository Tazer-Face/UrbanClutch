
import Order from "../../Modals/Orders.js";
import OrderDataAbs from "../Abstractions/OrderDataAbs.js";

export class MongoDbOrderRepository extends OrderDataAbs {

    async placeOrder(data,session) {
        try {
            
             let res = await Order.create({
                Name: data.Name ,
                Address: data.Address,
                State: data.State,
                City: data.City,
                PinCode: data.PinCode,
                Email: data.Email,
                OrderDetails: data.OrderDetails,
                PhoneNo: data.PhoneNo

             },
             {
                session
             });
            
             return res;
        }
        catch (error) {
            console.error("Error creating new order error", error);
            throw error;
        }

    }

    
    
}
