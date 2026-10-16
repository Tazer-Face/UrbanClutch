import { useContext } from "react";
import { ProductDataContext } from "../../../App/Providers/ProductDataContext";

export function useDeleteItem(){
    const { setUserData} = useContext(ProductDataContext);
    

    function deleteItem(id,size){
        
        
        if (confirm("Remove this item from your cart?")) {

            setUserData(prev =>{
            
            const {[size]:remove , ...remaining} = prev.cart[id]
                if(Object.keys(remaining).length === 0){
                    const updated = { ...prev.cart };
                    delete updated[id];
                    return {
                        ...prev,
                        cart: updated
                    };
                }
            return {...prev,cart :{...prev.cart,[id]: remaining }}
            })
        }
    }

    return {deleteItem}

       
  }