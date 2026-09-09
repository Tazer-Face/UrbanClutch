import { useContext } from "react";
import { ProductDataContext } from "../../../App/Providers/ProductDataContext";
import axios from 'axios'

export function useCreateOrderReq(){

    const { cartData } = useContext(ProductDataContext);

    async function createNewOrder(){
        

        let res = await axios.post("http://localhost:3000/api/orderData",cartData)

        return res;
    }

    return {createNewOrder}

}