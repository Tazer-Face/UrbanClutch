import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { ProductDataContext } from "../../App/Providers/ProductDataContext";
import { useContext } from 'react';

const NavBar = () => {

  const {quant} = useContext(ProductDataContext);
  return (

    <Navbar expand="lg" bg="black" variant="dark" className="p-3 my-navbar">
        <Container >
            <Nav className="d-flex flex-row align-items-center flex-nowrap justify-content-between gap-3 gap-md-4 w-100 p-2 nav" >
              <a href="https://www.instagram.com/urbanclutch_/" target="_blank" rel="noopener noreferrer">
                <img src="/Instagram.png" alt="Instagram"style={{ width: "35px", height: "35px" }}/>
              </a>
              <Nav.Link as={Link} to="/home"><img src="/Home.png" alt="Home" style={{ width: '35px', height: '35px' }} /></Nav.Link>
              <div className="position-relative">
              <Nav.Link as={Link} to="/cart"><img src="/Cart.png" alt="Cart" style={{ width: '35px', height: '35px' }} /></Nav.Link>
                {/* <span className="position-absolute top-0 translate-middle badge rounded-pill " style={{ right: "-10px" }}>
                    3
                </span> */}
                <span
                    className="position-absolute top-0 translate-middle rounded-circle text-light d-flex justify-content-center align-items-center cartQunatity"
                    style={{ width: "18px", height: "18px", fontSize: "11px" , right:"-10px", top:"11px"}}
                >
                  {quant}
                </span>
              </div>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavBar