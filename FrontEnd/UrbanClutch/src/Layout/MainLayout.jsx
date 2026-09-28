import React from 'react'
import Header from '../Shared/Components/Header.jsx'
import Footer from '../shared/Components/Footer.jsx'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div style={{backgroundColor :"#ffffff" ,display: "flex", flexDirection: "column", height: "100dvh" ,overflowY: "hidden" , overflowX : "hidden"}}>
        <Header/>
        <main style={{ flex: 1, overflow: "auto" }}>
          <Outlet />
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout