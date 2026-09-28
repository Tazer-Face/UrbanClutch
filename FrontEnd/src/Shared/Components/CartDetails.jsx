import React, { useEffect } from 'react'
import DeleteIcon from "../../Assets/Icons/DeleteIcon.png";
import AddIcon from "../../Assets/Icons/AddIcon.png";
import SubIcon from "../../Assets/Icons/SubIcon.png";

const CartDetails = ({id,productD,size,qty,fn,fn1,display,fn2}) => {

    
  return (
    <div  className="d-flex flex-row align-items-center justify-content-start gap-5 cartCheckout cartCheckoutMedia w-100">
        <div>
            <img
            onClick={fn2}
            src={productD?.productCardImage}
            alt="Cart"
            style={{ max: "150px", height: "150px", borderRadius: "15px" }}
            className="CartImg"
            />
        </div>
        <div className="d-flex flex-column align-items-start justify-content-start gap-3 w-100">
            <div className="d-flex flex-row align-items-center justify-content-between w-100 ">
            <p className="m-0 cartText fw-bold">{productD?.productTitle}</p>
            {
                display &&
                <div >
                    <img onClick={()=>{fn1(id,size)}} src={DeleteIcon}></img>
                </div>
            }
            
            </div>
            <p className="m-0 cartText">Size : {size}</p>

            <div className="d-flex flex-row align-items-center justify-content-between w-100 ">
            {   
                display ?
                <div
                style={{ maxWidth: "150px" }}
                className="d-flex flex-row gap-2 align-items-center justify-content-center"
                >
                    <img src={AddIcon} style={{ width: "25px", height: "25px" }} onClick={()=>{fn(id,size,qty+1,"add")}}/>
                    <p className="m-0 cartText">{qty}</p>
                    <img src={SubIcon} style={{ width: "25px", height: "25px" }} onClick={()=>{fn(id,size,qty-1,"sub")}}/>
                </div> :
                <div
                style={{ maxWidth: "150px" }}
                className="d-flex flex-row gap-2 align-items-center justify-content-center"
                >
                    <p className="m-0 cartText">{qty}</p>
                </div>

            }
            
            <p className="m-0 cartText">₹{productD?.productPrice}</p>
            </div>
        </div>
    </div>
  )
}

export default CartDetails