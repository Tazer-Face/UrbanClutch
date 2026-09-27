import React from 'react'
import { Container } from 'react-bootstrap'
import { useProductNavigate } from '../../../Shared/Hooks/useProductNavigate'

const Footer = () => {
   const {viewProduct} = useProductNavigate()
  return (
    <div className="footerMargin" style={{backgroundColor:"#f5f5f5",width:"100%"}}>


        <div  className='mt-5 row justify-content-center w-100 p-4'>
            <h6 className='col-12 col-sm-2 text-center'
                onClick={()=>{viewProduct("aboutUs")}}
            >
            About Us
            </h6>
            <h6 className='col-12 col-sm-2 text-center'
                 onClick={()=>{viewProduct("contactUs")}}
            >Contact Us</h6>
            <h6 className='col-12 col-sm-2 text-center'
                onClick={()=>{viewProduct("privacyPolicy")}}
            >
            Privacy Policy 
            </h6>
            <h6 className='col-12 col-sm-2 text-center'
                onClick={()=>{viewProduct("tAndC")}}
            >
            Terms & Conditions
            </h6>
            <h6 className='col-12 col-sm-2 text-center'
                onClick={()=>{viewProduct("shipping")}}
            >
            Shipping Policy 
            </h6>
            <h6 className='col-12 col-sm-2 text-center'
                onClick={()=>{viewProduct("returnRefund")}}
            >
            Return & Refund Policy
            </h6>
        </div>

    </div>

  )
}

export default Footer