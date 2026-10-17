import { useContext, useState } from "react";
import { ProductDataContext } from "../../../App/Providers/ProductDataContext";
import { useProductNavigate } from "../../../Shared/Hooks/useProductNavigate";

export function useVerifyPayment(){

    const { setUserData,setDisable } = useContext(ProductDataContext);
    const [loading,setLoading] = useState(false);
    const {viewProduct} = useProductNavigate();

    function verifyPayment(orders){
        
        if(orders[0].status === "Confirmed"){
            setUserData(prev=>({...prev , cart : {} , userOrders : orders}))
            alert("Payment confirmed , redirecting you to the home page"); 
        }
        else{
            alert("Server error will confirming order , please wait for sometime for the order to reflect in your accout . If issue persisits , please contact support.")
        }
        setDisable(false)
        viewProduct("cart");
    }

    return {verifyPayment,loading}

}