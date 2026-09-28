import { useContext } from "react";
import { ProductDataContext } from "../../../App/Providers/ProductDataContext";
import { delayFnExe } from "../Utils/delayFnExe";

export function useDeleteItem(){
    const { setCartData , cartData} = useContext(ProductDataContext);
    

    function deleteItem(id,size){
        
        
        if (confirm("Remove this item from your cart?")) {

            setCartData(prev =>{
            
            const {[size]:remove , ...remaining} = prev.cartData[id]
                if(Object.keys(remaining).length === 0){
                    const updated = { ...prev.cartData };
                    delete updated[id];
                    return {
                        ...prev,
                        cartData: updated
                    };
                }
            return {...prev,cartData :{...prev.cartData,[id]: remaining }}
            })
        }
    }

    return {deleteItem}

       
  }