import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import CartNavBar from "./CartNavBar";
import { useProductNavigate } from "../../../Shared/Hooks/useProductNavigate";
import { useCart } from "../../../Shared/Hooks/useCart";
import { useContext } from "react";
import { ProductDataContext } from "../../../App/Providers/ProductDataContext";

const Address = () => {
  const { userData} = useContext(ProductDataContext);

  const [data, setData] = useState({
  Name: userData.userDetails?.Name ?? "",
  Email: userData.userDetails?.Email ?? "",
  PhoneNo: userData.userDetails?.PhoneNo ?? "",
  State: userData.userDetails?.State ?? "",
  City: userData.userDetails?.City ?? "",
  PinCode: userData.userDetails?.PinCode ?? "",
  Address: userData.userDetails?.Address ?? ""
});


  const location = useLocation();
  const {viewProduct} = useProductNavigate();
  
  const {updateUserDetails} = useCart();

  function handleChange(e) {
    let value = e.target.value;
    console.log(value)
    setData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  }

  function saveAddress(){
    updateUserDetails(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateUserDetails(data);
    viewProduct("payment");
  }

  return (
    <Container>
      <div className="d-flex flex-column align-items-center justify-content-center mt-3 mb-5">
        <CartNavBar locationCur={location.pathname} clickFn={viewProduct} routes={["cart",null,null]}/>
        <Form
          className="w-100 mt-2"
          style={{ maxWidth: "1000px" }}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="userName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="Name"
              value={data.Name}
              onChange={handleChange}
              type="text"
              placeholder="Enter name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="Email"
              value={data.Email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userPhNo">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="PhoneNo"
              value={data.PhoneNo}
              onChange={handleChange}
              type="text"
              placeholder="Enter phone number ex 8877345321"
              pattern="[0-9]{10}"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userState">
            <Form.Label>State</Form.Label>
            <Form.Control
              name="State"
              value={data.State}
              onChange={handleChange}
              type="text"
              placeholder="Enter State"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              name="City"
              value={data.City}
              onChange={handleChange}
              type="text"
              placeholder="Enter city"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userPinCode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              name="PinCode"
              value={data.PinCode}
              onChange={handleChange}
              type="text"
              placeholder="Enter pincode Ex 123456"
              pattern="[0-9]{6}"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="Address"
              value={data.Address}
              onChange={handleChange}
              type="text"
              placeholder="Enter Address"
              required
            />
          </Form.Group>

          <div className="d-flex align-items-center justify-content-between">
            <Button className="cartAddPayBtn " type="submit">
              Continue
            </Button>
            <Button className="cartAddSaveBtn " onClick={saveAddress}>
              SAVE ADDRESS
            </Button>
          </div>

          
        </Form>
      </div>
    </Container>
  );
};

export default Address;
