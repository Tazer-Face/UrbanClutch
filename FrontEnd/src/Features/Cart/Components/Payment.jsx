import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useProductNavigate } from "../../../Shared/Hooks/useProductNavigate";
import CartNavBar from "./CartNavBar";
import { useContext } from "react";
import { ProductDataContext } from "../../../App/Providers/ProductDataContext";
import CartDetails from "../../../Shared/Components/CartDetails";
import {useCreateOrderReq} from "../Hooks/useCreateOrderReq.js"
import {useCreateRazerpayCheckout} from "../Hooks/useCreateRazerpayCheckout.js"

const Payment = () => {

    const location = useLocation();
    const {viewProduct} = useProductNavigate();
    const { productData,cartData ,total ,shipping} = useContext(ProductDataContext);
    const {createNewOrder} = useCreateOrderReq();
    const {createCheckout} = useCreateRazerpayCheckout();
   
    async function payNow(){
      try{
        let res = await createNewOrder();
        console.log(res);
        let rzp = createCheckout(res);
        rzp.open();
      }
      catch(err){
        alert("Unable to place your order at the moment , please try again later.")
        console.error("Unable to place order",err)
      }
      
    }

  return (
    <Container>

      <CartNavBar locationCur={location.pathname} clickFn={viewProduct} routes={["cart","address",null]} />
      { total > 0 ?
        <div className="d-flex flex-column flex-md-row align-items-start justify-content-center gap-4 w-100 mb-5">
          <div  style={{ flex: "0 0 70%" }} className="cart-left d-flex flex-column align-items-center justify-content-center gap-4 w-100">
          {
            Object.entries(cartData.cartData).map(([id,products]) =>{
              
              let productD = productData.find(ele =>ele.productId === id ) ;

              return Object.entries(products).map(([size,qty]) => (
          
              <CartDetails key={size+id} id = {id} productD={productD} size={size} qty={qty} display={false} />
              ))
              
            })
            
          }
          </div>

          <div style={{ flex: "0 0 30%" }} className="cart-right d-flex flex-column align-items-start mt-2 gap-3 w-100">
            <div className="w-100">
              <h3>ADDRESS</h3>

              <p>{cartData.userDetails.address}</p>
            </div>

            <div className="w-100 ">
              <h3>PRICE DETAILS</h3>
                <div className="row w-100 mt-2">
                  <div className="col">
                    <p>Total MRP</p>
                    {/* <p>Discount</p> */}
                    <p>Shipping</p>
                    <br/>
                    <h3>Total Amount</h3>
                  </div>
                  <div className="col text-end m-0 p-0 text-nowrap">
                    <p>₹{total}</p>
                    {/* <p>0</p> */}
                    <p>₹{shipping}</p>
                    <br/>
                    <h3>₹{total+shipping}</h3>
                  </div>
                </div>
            </div>

            <div className="w-100 mt-3">
              <Button onClick={payNow} className="cartAddPayBtn w-100">
                          PLACE ORDER
              </Button>
            </div>

          </div>
          
        </div> : 
        <div className="d-flex flex-column align-items-center justify-items-center mt-5">
          <h3>YOUR BAG IS EMPTY : /</h3>
        </div>
      }
    </Container>
  );
};

export default Payment;
