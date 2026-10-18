import React from 'react'
import { useParams } from 'react-router-dom';
import { ProductDataContext } from '../../../App/Providers/ProductDataContext';
import { useContext } from 'react';
import CartDetails from '../../../Shared/Components/CartDetails';
import { Container } from 'react-bootstrap';
import { useState } from 'react';

const OrderDetails = () => {
    const { id } = useParams();
    const {userData,productData,shipping} = useContext(ProductDataContext)
    const [data,setData] = useState(()=>{
        return userData?.userOrders.length > 0  ? userData?.userOrders?.find(ele => ele._id === id) : []
    })
  return (
    <Container>

        { id !== undefined ?

        <div className="d-flex flex-column flex-md-row align-items-start justify-content-center gap-4 w-100 mb-5">
          <div  style={{ flex: "0 0 70%" }} className="cart-left d-flex flex-column align-items-center justify-content-center gap-4 w-100">
          {
            
            data?.OrderDetails.map(({productId,sizes}) =>{
            
              let productD = productData.find(ele =>ele.productId === productId ) ;
              

              return Object.entries(sizes).map(([size,qty]) => (
          
              <CartDetails key={size+id} id = {id} productD={productD} size={size} qty={qty} display={false} />
              ))
              
            })
            
          }
          </div>

          <div style={{ flex: "0 0 30%" }} className="cart-right d-flex flex-column align-items-start mt-2 gap-4 w-100">
            <div className="w-100">
                <h3>ORDER STATUS</h3>
                <div className="w-100 d-flex align-items-center shadow border-light rounded p-3">
                    <p>{data.status}</p>
                </div>
            </div>

            <div className="w-100">
                <h3>ORDER DETAILS</h3>
                <div className="w-100 shadow border-light rounded p-3">

                    <div className="w-100">
                    <h6>Name</h6>
                    <p>{data.UserData.Name}</p>
                    </div>
                    <div className="w-100">
                    <h6>Phone No</h6>
                    <p>{data.UserData.PhoneNo}</p>
                    </div>
                    <div className="w-100">
                    <h6>Address</h6>
                    <p>{data.UserData.Address}</p>
                    </div>
                    <div className="w-100">
                    <h6>City</h6>
                    <p>{data.UserData.City}</p>
                    </div>
                    <div className="w-100">
                    <h6>State</h6>
                    <p>{data.UserData.State}</p>
                    </div>
                    <div className="w-100">
                    <h6>Pincode</h6>
                    <p>{data.UserData.PinCode}</p>
                    </div>

                </div>
            </div>

            <div className="w-100 ">
              <h3>PRICE DETAILS</h3>
                <div className="row w-100 mt-2">
                  <div className="col">
                    <p>Total</p>
                    {/* <p>Discount</p> */}
                    <p>Shipping</p>
                    <br/>
                    <h3>GRAND TOTAL</h3>
                  </div>
                  <div className="col text-end m-0 p-0 text-nowrap">
                    <p>₹{data.Total-shipping}</p>
                    {/* <p>0</p> */}
                    <p>₹{shipping}</p>
                    <br/>
                    <h3>₹{data.Total}</h3>
                  </div>
                </div>
            </div>
    


          </div>
          
        </div> 
         : 
        <div className="d-flex flex-column align-items-center justify-items-center mt-5">
          <h3>No orders available</h3>
        </div>
        }
    </Container>
  )
}

export default OrderDetails