import React, { useState } from 'react'
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import { useProductNavigate } from '../../../Shared/Hooks/useProductNavigate';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/Firebase.js";
import { useLoginSignInSubmit } from '../Hooks/useLoginSignInSubmit.js';

const SignUpForm = () => {
    const [data,setData] = useState({email :"",password : ""})
    const [disableSignIn,setDisableSignIn] = useState(false)
    const {viewProduct} = useProductNavigate();
    const {onSignInSubmit} = useLoginSignInSubmit()
    function handleSubmit(e){
        e.preventDefault();
        setDisableSignIn(true)
        onSignInSubmit(data,setDisableSignIn)
    }

    function handleChange(e){
        let value = e.target.value;
        let name = e.target.name;
        setData(prev=>({...prev,[name]:value}))
    }
  return (
    <Container className="h-100">
      <div className="d-flex flex-column align-items-center justify-content-center h-100">
        <Form 
        className ="p-3 border rounded shadow "
        onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center w-100">
                <h4>SIGNUP</h4>
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
            type="password" 
            placeholder="Password" 
            name = "password"
            value = {data.password}
            required
            onChange = {handleChange}
            />
            </Form.Group>
            <div className="d-flex align-items-center justify-content-between w-100 gap-5">
                <Button disabled={disableSignIn} variant="primary" type="submit">
                Submit
                </Button>
                <div onClick={()=>{viewProduct("login")}}>
                    <p className="signUpLogin" style={{margin:"0px" , fontWeight:"600"}}>Already have an account ? Login</p>
                </div>
            </div>
        </Form>
      </div>
    </Container>
  )
}

export default SignUpForm