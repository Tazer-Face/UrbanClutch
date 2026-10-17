import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { ProductDataContext } from "../../App/Providers/ProductDataContext";
import { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useProductNavigate } from '../Hooks/useProductNavigate';
import Spinner from 'react-bootstrap/Spinner';


const NavToggle = () => {
    const [loginState , setLoginState] = useState("");
    const [logout , setLogout] = useState(false)
    const {handleLogout,user,setUserData} = useContext(ProductDataContext);
    const {viewProduct} = useProductNavigate();

    async function handleUserReq(){
        
        if(loginState === "LOGOUT"){
            try{
                setLogout(true);
                await handleLogout(user,setLogout);
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

    useEffect(()=>{
        if(user){
            setLoginState("LOGOUT")
        }
        else{
             setLoginState("LOGIN")
        }
        
    },[user])

    if (logout) {
      return (
        <Container>
          <div className="d-flex justify-content-center p-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Container>
      );
    }

  return (
    <Navbar expand="lg" bg="black" variant="dark" className="p-3">
        <Container >
            <Dropdown>
                <Dropdown.Toggle variant="light" id="hamburger-menu">
                    ☰
                </Dropdown.Toggle>
                
                
                <Dropdown.Menu>
                    <Dropdown.Item  onClick={handleUserReq}>{loginState}</Dropdown.Item>
                    <Dropdown.Item  onClick={()=>{viewProduct("/")}}>HOME</Dropdown.Item>
                    <Dropdown.Item  onClick={()=>{viewProduct("cart")}}>CART</Dropdown.Item>
                    <Dropdown.Item  onClick={()=>{viewProduct("orders")}}>ORDERS</Dropdown.Item>
                </Dropdown.Menu>

            </Dropdown>

        </Container>
    </Navbar>
  )
}

export default NavToggle