import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { ProductDataContext } from "../../App/Providers/ProductDataContext";
import { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useProductNavigate } from '../Hooks/useProductNavigate';
import Spinner from 'react-bootstrap/Spinner';


const NavToggle = () => {
    const [loginState , setLoginState] = useState("");
    const {handleLogout,user,setUserData} = useContext(ProductDataContext);
    const {viewProduct} = useProductNavigate();

    async function handleUserReq(){
        
        if(loginState === "LOGOUT"){
            try{
                await handleLogout(user);
                setUserData({ cart: {},userDetails: {},userId : "" })
                viewProduct("login")

            }catch(err){
                setLogout(false);
                console.error(err);
            }
            
        }
        else{
            viewProduct("login")
        }
    }

    function handleOrders(){
        if(user){
            viewProduct("orders")
        }
        else{
            alert("You need to login before you can check your orders , redirectin you to the Login page");
            viewProduct("login")
        }

    }

    useEffect(()=>{
        if(user){
            setLoginState("LOGOUT")
        }
        else{
             setLoginState("LOGIN")
        }
        
    },[user])

  return (
    <Navbar expand="lg" bg="black" variant="dark" className="p-3">
        <Container >
            <Dropdown>
                <Dropdown.Toggle variant="light" id="hamburger-menu">
                    ☰
                </Dropdown.Toggle>
                
                
                <Dropdown.Menu>
                    <Dropdown.Item  onClick={()=>{viewProduct("/")}}>HOME</Dropdown.Item>
                    <Dropdown.Item  onClick={()=>{viewProduct("cart")}}>CART</Dropdown.Item>
                    <Dropdown.Item  onClick={handleOrders}>ORDERS</Dropdown.Item>
                    <Dropdown.Item  onClick={handleUserReq}>{loginState}</Dropdown.Item>
                </Dropdown.Menu>

            </Dropdown>

        </Container>
    </Navbar>
  )
}

export default NavToggle