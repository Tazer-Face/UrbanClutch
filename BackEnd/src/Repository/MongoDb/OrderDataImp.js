
import Order from "../../Modals/Orders.js";
import OrderDataAbs from "../Abstractions/OrderDataAbs.js";

export class MongoDbOrderRepository extends OrderDataAbs {

    async placeOrder(data,session=null) {
        try {
            
             let res = await Order.create(data,
             {
                session
             });
            
             return res;
        }
        catch (error) {
            console.error("Error creating new order", error);
            throw error;
        }

    }

    async getOrders(id) {
        try {
            
             let res = await Order.find(id).sort({createdAt : -1}).lean();
            
             return res;
        }
        catch (error) {
            console.error("Error fetching orders", error);
            throw error;
        }

    }
    
    
}
