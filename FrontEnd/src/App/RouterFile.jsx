import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from '../Layout/MainLayout.jsx'
import Home from '../Features/Home/Home.Page.jsx'
import Cart from '../Features/Cart/Cart.Page.jsx'
import Address from '../Features/Cart/Components/Address.jsx'
import Payment from '../Features/Cart/Components/Payment.jsx'
import ProductView from '../Features/ProductView/ProductView.Page.jsx'
import AboutUs from '../Features/Home/Components/AboutUs.jsx'
import ContactUs from '../Features/Home/Components/ContactUs.jsx'
import PrivacyPolicy from '../Features/Home/Components/PrivacyPolicy.jsx'
import TermsAndConditions from '../Features/Home/Components/TermsAndConditions.jsx'
import ShippingPolicy from '../Features/Home/Components/ShippingPolicy.jsx'
import ReturnRefundPolicy from '../Features/Home/Components/ReturnRefundPolicy.jsx'

const RouterFile = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<Home />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route path="/address" element={<Address />}/>
                <Route path="/payment" element={<Payment />}/>
                <Route path="/viewProduct/:id" element={<ProductView />}/>
                <Route path="/aboutUs" element={<AboutUs/>}/>
                <Route path="/contactUs" element={<ContactUs/>}/>
                <Route path="/privacyPolicy" element={<PrivacyPolicy/>}/>
                <Route path="/tAndC" element={<TermsAndConditions/>}/>
                <Route path="/shipping" element={<ShippingPolicy/>}/>
                <Route path="/returnRefund" element={<ReturnRefundPolicy/>}/>
            </Route>
        </Routes>
    </Router>
  )
}

export default RouterFile