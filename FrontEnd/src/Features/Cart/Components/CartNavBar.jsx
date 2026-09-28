import React from 'react'

const CartNavBar = ({locationCur,clickFn=undefined,routes=[null,null,null]}) => {

  return (
    <div className="d-flex flex-row align-items-center justify-content-center w-100 gap-5 mt-5">
    
          <p onClick={()=>clickFn(routes[0])} className={locationCur === "/cart" ? "active-step" : ""}>
            BAG
          </p> 
          <p onClick={()=>clickFn(routes[1])} className={locationCur === "/address" ? "active-step" : ""}>
            ADDRESS
          </p>
          <p onClick={()=>clickFn(routes[2])} className={locationCur === "/payment" ? "active-step" : ""}>
            PAYMENT
          </p>
    </div>
  )
}

export default CartNavBar