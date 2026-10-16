import { useContext } from "react";
import { ProductDataContext } from "../../../App/Providers/ProductDataContext";
import { delayFnExe } from "../Utils/delayFnExe";

export function useCheckUpdateItem(){

    const {delay} = delayFnExe();

    function setMessage(){
      alert("You've reached the maximum quantity for this item.")
    }

    let delayAlert = delay(setMessage,500);

    const { productData, setUserData ,userData} = useContext(ProductDataContext);

    function checkUpdateQty(id,size,curQty,operation){
      let product = productData.find(ele => ele.productId === id)
      if(product.inventory[size] >= curQty && operation === "add"){
        setUserData(prev =>({...prev,cart : {...prev.cart ,[id]:{...prev.cart[id],[size]:curQty}}}))
      }
      else if(curQty > 0 && operation === "sub"){
        setUserData(prev =>({...prev,cart : {...prev.cart ,[id]:{...prev.cart[id],[size]:curQty}}}))
      }
      else if(operation === "add"){
        (delayAlert)()
      }
    }

    function syncServerData(){
      
     let flag = false;
     Object.entries(userData.cart ?? {}).map(([id,products]) =>{
            
            
            return Object.entries(products).map(([size,qty]) => {
              
            let product = productData.find(ele => ele.productId === id)
            let curQantitiy = product?.inventory[size];

            if(curQantitiy < qty && curQantitiy !== 0){
              setUserData(prev =>({...prev,cart : {...prev.cart ,[id]:{...prev.cart[id],[size]:curQantitiy}}}))
              flag = true;
            }
            else if(curQantitiy === 0 ){
              

              setUserData(prev => {
                let delUpdate = {...prev.cart};
                delete delUpdate[id]
                return {...prev,cart:delUpdate};
              })

              flag = true;
              
            }
                  
          })

    })

    if(flag){
      alert("Your cart is updated as a few items are no longer be available.");
      flag = false;
    } 
  }

    return {checkUpdateQty,syncServerData}

       
  }

