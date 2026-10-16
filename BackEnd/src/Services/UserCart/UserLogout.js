import { checkCart } from "../../Utils/CheckCartData.js";

export default class UpdateUserDetailsS{
    
    constructor(userRepository1,userRepository2,service2){
        this.userRepository1 = userRepository1;
        this.userRepository2 = userRepository2;
        this.service2 = service2;

    }

    async updateUserDetails(data){
        try{

            let products = await this.userRepository1.getProductData();
            
            let checkedCart = checkCart(products,data.userDetails.cart)
            
            data.userDetails.cart = checkedCart;

            let result = await this.userRepository2.updateUser(data)   

            return result;

        }catch(err){
            console.error(err);
            throw err;
        }
    }
}