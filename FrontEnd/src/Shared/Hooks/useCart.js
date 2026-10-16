import { ProductDataContext } from "../../App/Providers/ProductDataContext";
import { useContext } from "react";

export function useCart(){

const {setUserData} = useContext(ProductDataContext)

  

function addUpdate(id, size) {

    setUserData(prev => ({
      ...prev,
      cart : {
      ...prev.cart ,
          [id]: {
            ...prev.cart?.[id],
            [size]: (prev.cart?.[id]?.[size] || 0) + 1
          }
      }
    }));
  
}

function updateUserDetails(data) {
  setUserData(prev => ({
    ...prev,
    userDetails : data
  }));
}

return {addUpdate,updateUserDetails}
}