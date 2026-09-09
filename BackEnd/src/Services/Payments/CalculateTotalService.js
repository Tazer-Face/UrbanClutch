import dotenv from 'dotenv';
import { AppError } from "../../Utils/ErrorClass.js";
dotenv.config()




class CalculateToTalS{
    constructor(userRepository1,userRepository2){
        this.userRepository1 = userRepository1;
        this.userRepository2 = userRepository2
    }


    

    async calculateTotal(reservationId){

        
        try{

            let data = await this.userRepository1.getReservation(reservationId);
            if(!data || data.length === 0){
                return new AppError("Reservation doesnt exist",404,data);
            }


            let ids = data[0].OrderDetails.map(({productId,sizes})=>(
                productId
            )
            )

             let qunatity = data[0].OrderDetails.map(({productId,sizes})=>({
                productId , quantity :  Object.values(sizes).reduce((total, quantity) => total + quantity, 0)
            })
            )

            

            let products = await this.userRepository2.getProductDataIds(ids);


            if(!products || products.length === 0){
                return new AppError("products dont exist",404,data);
            }

            let TotalPrice = products.map( prod =>({
                price : prod.productPrice , quant : qunatity.find(ele => ele.productId === prod.productId ).quantity
                })
            ).reduce((total,ele) => total+(ele.quant*ele.price*100),0)+100*100
           
            return TotalPrice;
        }
        catch(err){
        

            if (err instanceof AppError) {
                throw err;
            }

            throw new AppError(
                "Unable to create order",
                500,
                err
            );
        }
    }
}

export default CalculateToTalS