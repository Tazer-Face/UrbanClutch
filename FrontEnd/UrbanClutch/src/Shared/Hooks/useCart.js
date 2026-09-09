import { useCol } from "react-bootstrap/esm/Col";
import { ProductDataContext } from "../../App/Providers/ProductDataContext";
import { useContext } from "react";
import { useProductNavigate } from "./useProductNavigate";

export function useCart(){

const {setCartData} = useContext(ProductDataContext)

  

function addUpdate(id, size) {
  setCartData(prev => ({
    ...prev,
    cartData : {
    ...prev.cartData,
        [id]: {
          ...prev.cartData[id],
          [size]: (prev.cartData[id]?.[size] || 0) + 1
        }
    }
  }));
}

function updateUserDetails(data) {
  setCartData(prev => ({
    ...prev,
    userDetails : data
  }));
}

return {addUpdate,updateUserDetails}
}