import { AppError } from "../../Utils/ErrorClass.js"
import { checkCart } from "../../Utils/CheckCartData.js";

export default class MergeUserCartS{
    constructor(userRepository1,userRepository2,userRepository3){
        this.userRepository1 = userRepository1
        this.userRepository2 = userRepository2
        this.userRepository3 = userRepository3
    }

    async mergeUserCart(data,userData){
        try{
            let result2;
            let result;
            if(Object.keys(data.userDetails.cart).length > 0 || userData.cart.length > 0 ){
                let products = await this.userRepository1.getProductData();

                let userCartTransformed = Object.fromEntries(userData.cart.map(ele =>(
                    [ele.productId , ele.sizes]
                )))

                let mergedCart = {...userCartTransformed};

                for ( const [id,sizes] of Object.entries(data.userDetails.cart)){

                    if(!mergedCart[id]){
                        mergedCart[id] = {};
                    }
        
                    for (const[key,value] of Object.entries(sizes)){
                            mergedCart[id][key] = (mergedCart[id][key] || 0)+value;
                    }

                }
            
                let checkedCart = checkCart(products,mergedCart)

                data.userDetails.cart = checkedCart;

                result2 = await this.userRepository2.updateUser(data);
                result = result2.toObject();
            }else{
                result = userData;
            }
     

            let orders = await this.userRepository3.getOrders({FirebaseUid : data.userObj.uid});


            result.cart = Object.fromEntries(
                result.cart.map(({ productId, sizes }) => [
                    productId,
                    sizes
                ])  
            );

            result.userOrders = orders;
        
            return result

        }catch(err){
            console.error(err)
            throw new AppError("Unable to create new user",500,err)
        }
    }
}