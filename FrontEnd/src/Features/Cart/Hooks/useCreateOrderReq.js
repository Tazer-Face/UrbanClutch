import { useContext } from "react";
import { ProductDataContext } from "../../../App/Providers/ProductDataContext";
import axios from 'axios'
import { useProductNavigate } from "../../../Shared/Hooks/useProductNavigate";

export function useCreateOrderReq(){

    const { userData ,user} = useContext(ProductDataContext);
    const {viewProduct} = useProductNavigate();

    async function createNewOrder(){
        
        try{
            let token = await user.getIdToken();
            //http://localhost:3000/api/orderData  
            let res = await axios.post("https://api.urbanclutch.in/api/orderData",userData,{
            headers : {
                Authorization : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        })

        return res;

        }catch(err){
            console.error(err)
            alert(err.response.data.message)
            viewProduct("cart")
        }
        
    }

    return {createNewOrder}

}