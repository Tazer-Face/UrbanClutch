import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { ProductDataContext } from "../../App/Providers/ProductDataContext";
import CartNavBar from "./Components/CartNavBar";
import { useProductNavigate } from "../../Shared/Hooks/useProductNavigate";
import { useDeleteItem } from "./Hooks/useDeleteItem";
import { useCheckUpdateItem } from "./Hooks/useCheckUpdateItem";
import CartDetails from "../../Shared/Components/CartDetails";



const Cart = () => {
  const { productData, cartData  ,total ,setProductData } = useContext(ProductDataContext);
  const location = useLocation();
  const {viewProduct} = useProductNavigate();
  const {checkUpdateQty,syncServerData} = useCheckUpdateItem();
  const {deleteItem} = useDeleteItem()
  //const [data,setData] = useState(cartData)

  // function checkUpdate(){
    
  //   setProductData(prev => {
  //       const updated = [...prev];

  //       updated[0] = {
  //           ...updated[0],
  //           productQuantity: {
  //               ...updated[0].productQuantity,
  //               S: 0
  //           }
  //       };

  //       return updated;
  //   });

  // }

  useEffect(()=>{
    syncServerData();
  },[productData])



  return (
    <Container>
      <div className="d-flex flex-column align-items-center justify-content-center mb-5 gap-5">
        <CartNavBar locationCur={location.pathname} />
        {
          Object.entries(cartData.cartData ?? {}).map(([id,products]) =>{
            
            let productD = productData.find(ele =>ele.productId === id ) ;
            return Object.entries(products).map(([size,qty]) => (
        
            <CartDetails key={size+id} id = {id} productD={productD} size={size} qty={qty} fn={checkUpdateQty} fn1={deleteItem} fn2={()=>viewProduct("viewProduct",id)}display={true} />
            ))
            
          })
          
        }
        { total > 0 ?

          <div className="d-flex flex-column align-items-start flex-md-row align-items-md-center justify-content-md-between w-100 gap-4" style={{maxWidth : "1000px"}}>
          <h4>TOTAL AMOUNT : ₹ {total} </h4>
          <Button className="w-50 w-md-100 cartAddPayBtn" onClick={()=>viewProduct("address")} >
            CONTINUE
          </Button>
        </div> : <h3>YOUR BAG IS EMPTY : /</h3>
        }
        {/* <button onClick={checkUpdate}>Test</button> */}
        
      </div>
    </Container>
  );
};

export default Cart;
