import { useContext } from "react";
import { ProductDataContext } from "../../../App/Providers/ProductDataContext";

export function useCreateRazerpayCheckout(){

    const { cartData } = useContext(ProductDataContext);

    function createCheckout(razorpayOrder){
        

        const options = {
            key: import.meta.env.VITE_RAZORPAY_API_KEY,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            order_id: razorpayOrder.id,

            handler: function (response) {
                console.log(response);
            }
        };

        const rzp = new window.Razorpay(options);

        return rzp;
    }

    return {createCheckout}

}