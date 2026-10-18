import { useContext } from "react";
import { ProductDataContext } from "../../../App/Providers/ProductDataContext";
import axios from "axios";
import { useProductNavigate } from "../../../Shared/Hooks/useProductNavigate";

export function useCreateRazerpayCheckout(){;
    const {setDisable ,setUserData} = useContext(ProductDataContext);
    const {viewProduct} = useProductNavigate();
    function createCheckout(razorpayOrder,verifyPayment){
        
        
        const options = {
            key: "rzp_test_TkK8HKttLSOm8Q",
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            order_id: razorpayOrder.id,

            handler: async function (response) {
                try{
                    
                    
                    let orderData = await axios.post("https://api.urbanclutch.in/api/verifyOrder",response);
                    //let orderData = await axios.post("http://localhost:3000/api/verifyOrder",response);

                    if(orderData.data.success){
                        verifyPayment(orderData.data.data);
                    }

                    if(orderData.data.status === "already_paid"){
                        alert("Payment has been processed for this particular req , redirecting you to your cart");
                        setUserData(prev=>({...prev , cart : {} ,CheckoutKey : "" ,cartSignature : ""}));
                        setDisable(false)
                        viewProduct("cart");
                    }
                    

                }catch(err){
                    
                    if(err.response.data.message === "Payment unsuccessful"){
                        alert(err.response.data.message)
                        setUserData(prev=>({...prev , cart : {} ,CheckoutKey : "" ,cartSignature : ""}));
                    }
                    else{
                        alert("Something went wrong , incase your payment was processed please check your orders after sometime. If the issue still persists , please contact customer support.")
                        
                    }
                    
                    setDisable(false)
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