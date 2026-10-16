import { AppError } from "../../Utils/ErrorClass.js"
import { checkCart } from "../../Utils/CheckCartData.js";

export default class CreateUserDetailsS{
    constructor(userRepository1,userRepository2){
        this.userRepository1 = userRepository1
        this.userRepository2 = userRepository2
    }

    async createUserDetails(data){
        try{
            let products = await this.userRepository1.getProductData();

            let checkedCart = checkCart(products,data.userDetails.cart)

            data.userDetails.cart = checkedCart;
            
            let result1 = await this.userRepository2.addUser(data)

            let result = result1.toObject();

                result.cart = Object.fromEntries(
                    result.cart.map(({ productId, sizes }) => [
                        productId,
                        sizes
                    ])
            );
        
            return result

        }catch(err){
            throw new AppError("Unable to create new user",500,err)
        }
    }
}