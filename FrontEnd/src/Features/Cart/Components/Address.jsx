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
  const { cartData} = useContext(ProductDataContext);

  const [data, setData] = useState({
  name: cartData.userDetails?.name ?? "",
  email: cartData.userDetails?.email ?? "",
  phone: cartData.userDetails?.phone ?? "",
  state: cartData.userDetails?.state ?? "",
  city: cartData.userDetails?.city ?? "",
  pincode: cartData.userDetails?.pincode ?? "",
  address: cartData.userDetails?.address ?? ""
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

  function handleSubmit(e) {
    e.preventDefault();
    updateUserDetails(data);
    viewProduct("payment");
  }

  useEffect(()=>{
    console.log(data)
  })

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
              name="name"
              value={data.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              value={data.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userPhNo">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="phone"
              value={data.phone}
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
              name="state"
              value={data.state}
              onChange={handleChange}
              type="text"
              placeholder="Enter State"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              value={data.city}
              onChange={handleChange}
              type="text"
              placeholder="Enter city"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userPinCode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              name="pincode"
              value={data.pincode}
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
              name="address"
              value={data.address}
              onChange={handleChange}
              type="text"
              placeholder="Enter Address"
              required
            />
          </Form.Group>

          <Button className="cartAddPayBtn " type="submit">
            Continue
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Address;
