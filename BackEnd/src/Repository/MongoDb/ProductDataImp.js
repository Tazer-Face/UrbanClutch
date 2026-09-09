
import Product from "../../Modals/ProductData.js";
import ProductDataAbs from "../Abstractions/ProductDataAbs.js";

export class MongoDbProductRepository extends ProductDataAbs {

    async getProductData(){
        try {

             return await Product.find().lean();
            
        }
        catch (error) {
            console.error("Error fetching product data:", error);
            throw error;
        }

    }

    // async reserveInventory(productId, size, quantity) {

    //     try {

    //         const updatedProduct = await Product.findOneAndUpdate(
    //             {
    //                 productId,

    //                 [`inventory.${size}`]: { $gte : quantity }    
    //             },
    //             {
    //                 $inc: {
    //                     [`inventory.${size}`]: -quantity
    //                 }
    //             },
    //             {
    //                 new: true
    //             }
    //         );

    //         return updatedProduct  ;

    //     } catch (error) {
    //     console.error("Error reserving inventory:", error);
    //     throw error;
    //     }
    // }

    async updateProductData(operations,{session}) {

        try {

            const updatedProduct = await Product.bulkWrite(operations, { ordered: true, session });
            return updatedProduct;

        } catch (error) {
            console.error("Error updating product data:", error);
            throw error;
        }
    }

    async getProductDataIds(ids){
        try {

             return await Product.find({productId : { $in: ids }}).lean();
            
        }
        catch (error) {
            console.error("Error fetching product data:", error);
            throw error;
        }

    }

    
    
}
