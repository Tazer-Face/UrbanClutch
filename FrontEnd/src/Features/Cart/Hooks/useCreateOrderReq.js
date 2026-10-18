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
            
            let res = await axios.post("https://api.urbanclutch.in/api/orderData",userData,{
                headers : {
                    Authorization : `Bearer ${token}`,
                    'Content-Type' : 'application/json'
                }
            })
            // let res = await axios.post("http://localhost:3000/api/orderData",userData,{
            //     headers : {
            //         Authorization : `Bearer ${token}`,
            //         'Content-Type' : 'application/json'
            //     }
            // })

            if(res.data.status === "already_paid"){
                return {status : "paid"}
            }

        return res;

        }catch(err){
            console.error(err)
            alert(err.response.data.message)
            viewProduct("cart")
        }
        
    }

    return {createNewOrder}

}