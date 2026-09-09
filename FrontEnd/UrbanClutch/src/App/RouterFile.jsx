import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from '../Layout/MainLayout.jsx'
import Home from '../Features/Home/Home.Page.jsx'
import Cart from '../Features/Cart/Cart.Page.jsx'
import Address from '../Features/Cart/Components/Address.jsx'
import Payment from '../Features/Cart/Components/Payment.jsx'
import ProductView from '../Features/ProductView/ProductView.Page.jsx'

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
            </Route>
        </Routes>
    </Router>
  )
}

export default RouterFile