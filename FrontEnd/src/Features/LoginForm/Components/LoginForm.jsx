import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useProductNavigate } from "../../../Shared/Hooks/useProductNavigate";
import { useLoginSignInSubmit } from "../Hooks/useLoginSignInSubmit.js";
import Spinner from 'react-bootstrap/Spinner';

const LoginForm = () => {
    const {viewProduct} = useProductNavigate();
    const [data,setData] = useState({email :"",password : ""})
    const [disableLogin,setDisableLogin] = useState(false)
    const [passwordError,setPasswordError] = useState(false)
    const [serverError,setServerError] = useState(false)
    const {onLoginSubmit} = useLoginSignInSubmit()

    function handleSubmit(e){
        e.preventDefault()
        setDisableLogin(true)
        onLoginSubmit(data,setDisableLogin,setPasswordError,setServerError)
    }

    function handleChange(e){
        let value = e.target.value;
        let name = e.target.name;
        setData(prev=>({...prev,[name]:value}))
    }

    if (disableLogin) {
      return (
        <Container className="w-100">
          <div className="d-flex align-items-center justify-content-center p-4 w-100 h-100">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Container>
      );
    }

  return (
    <Container className="h-100">
      <div className="d-flex flex-column align-items-center justify-content-center h-100">
        <Form 
        className ="p-3 border rounded shadow "
        onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center w-100">
                <h4>LOGIN</h4>
            </div>
            
            <br></br>
            <Form.Group className="mb-3" controlId="userEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter email"
                name = "email"
                value = {data.email} 
                required
                onChange = {handleChange}
            />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="userPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Password" 
            name = "password"
            value = {data.password}
            required
            onChange = {handleChange}
            />
            { serverError &&
              <Form.Text className="text-muted ">
                  <p className="text-danger fw-bold">Unable to validate user , please try and login again </p>
              </Form.Text>
            }
             { passwordError &&
              <Form.Text className="text-muted ">
                  <p className="text-danger fw-bold">Wrong email or password</p>
              </Form.Text>
            }
            </Form.Group>
            
            <div className="d-flex align-items-center justify-content-between w-100 gap-5">
                <Button disabled={disableLogin} variant="primary" type="submit">
                Submit
                </Button>
                <div  className="d-flex flex-column justify-content-center">

                    <p onClick={()=>{viewProduct("signUp")}} className="signUpLogin" style={{margin:"0px" , fontWeight:"600"}}>Don't have an account ? Sign up.</p>
                    
                    <p onClick={()=>{viewProduct("resetPassword")}} className="reset"  style={{margin:"0px" , fontWeight:"600"}}>Reset password</p>
                </div>
            </div>
            
        </Form>
      </div>
    </Container>
  );
};

export default LoginForm
