import { useContext } from "react";
import { ProductDataContext } from "../../../App/Providers/ProductDataContext";
import axios from "axios";
import { useProductNavigate } from "../../../Shared/Hooks/useProductNavigate";

export function useCreateRazerpayCheckout(){;
    const {setDisable ,setUserData} = useContext(ProductDataContext);
    const {viewProduct} = useProductNavigate();
    function createCheckout(razorpayOrder,verifyPayment){
        
        
        const options = {
            key: import.meta.env.VITE_RAZORPAY_API_KEY,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            order_id: razorpayOrder.id,

            handler: async function (response) {
                try{
                    setDisable(true)
                    
                    //http://localhost:3000/api/verifyOrder  
                    let orderData = await axios.post("https://api.urbanclutch.in/api/verifyOrder",response);

                    if(orderData.data.success){
                        verifyPayment(orderData.data.data);
                    }
                    else{
                        alert(orderData.data.message)
                        setUserData(prev=>({...prev , cart : {}}));
                        setDisable(false);
                        viewProduct("cart");
                    }
                    

                }catch(err){
                    setDisable(false)
                    if(err.response.data.message === "Payment unsuccessful"){
                        alert(err.response.data.message)
                    }
                    else{
                        alert("Something went wrong , incase your payment was processed please check your orders after sometime. If the issue still persists , please contact customer support.")
                    }
                    setUserData(prev=>({...prev , cart : {}}));
                    viewProduct("cart");
                }
                    
                
            },
            modal: {
                ondismiss: function () {
                setDisable(false);
                }
            }
        };

        const rzp = new window.Razorpay(options);

        return rzp;
    }

    return {createCheckout}

}