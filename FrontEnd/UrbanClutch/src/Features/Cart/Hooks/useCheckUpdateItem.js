import { useContext } from "react";
import { ProductDataContext } from "../../../App/Providers/ProductDataContext";
import { delayFnExe } from "../Utils/delayFnExe";

export function useCheckUpdateItem(){

    const {delay} = delayFnExe();

    function setMessage(){
      alert("You've reached the maximum quantity for this item.")
    }

    let delayAlert = delay(setMessage,500);

    const { productData, setCartData ,cartData} = useContext(ProductDataContext);

    function checkUpdateQty(id,size,curQty,operation){
      let product = productData.find(ele => ele.productId === id)
      if(product.inventory[size] >= curQty && operation === "add"){
        setCartData(prev =>({...prev,cartData : {...prev.cartData ,[id]:{...prev.cartData[id],[size]:curQty}}}))
      }
      else if(curQty > 0 && operation === "sub"){
        setCartData(prev =>({...prev,cartData : {...prev.cartData ,[id]:{...prev.cartData[id],[size]:curQty}}}))
      }
      else if(operation === "add"){
        (delayAlert)()
      }
    }

    function syncServerData(){
      
     let flag = false;
     Object.entries(cartData.cartData ?? {}).map(([id,products]) =>{
            
            //let productD = productData.find(ele =>ele.productId === id ) ;
            return Object.entries(products).map(([size,qty]) => {
              
            let product = productData.find(ele => ele.productId === id)
            let curQantitiy = product.inventory[size];

            if(curQantitiy < qty && curQantitiy !== 0){
              setCartData(prev =>({...prev,cartData : {...prev.cartData ,[id]:{...prev.cartData[id],[size]:curQantitiy}}}))
              flag = true;
            }
            else if(curQantitiy === 0 ){
              

              setCartData(prev => {
                let delUpdate = {...prev.cartdata};
                delete delUpdate[id]
                return delUpdate;
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

