import React from "react";
import { Container } from "react-bootstrap";

const ContactUs = () => {
  return (
    <Container>
      <h2 className="fw-bold mt-3">CONTACT US</h2>
      <hr></hr>
      <h4>We'd Love to Hear From You</h4>
      <p>
        Have a question about an order, a product, sizing, shipping, or anything else?
      </p>
      <p>
        We're here to help.
      </p>
      <p>
        UrbanClutch is built by petrolheads, and we love hearing from fellow car and bike enthusiasts. Whether you have a question about one of our products or simply want to get in touch, feel free to reach out to us.
      </p>
      <hr></hr>
      <h5>
        Get in Touch
      </h5>
      <p className="fw-bold">
        Email
        <br></br>
        <span className="fw-normal">Urbanclutchh@gmail.com</span>
      </p>
      <p className="fw-bold">
        Phone
        <br></br>
        <span className="fw-normal">+91 73380 75101</span>
      </p>
       <hr></hr>
      <h5>
        Customer Support
      </h5>
      <p>
        For order-related queries, please include your order number in your message so we can help you faster.
      </p>
      <p>
        We aim to respond to all enquiries as soon as possible.
      </p>
      <p>
        Have a question? Don't hesitate to reach out.
      </p>
      <br></br>
      <h5>
        <img src="/LogoBlack.png" alt="Logo" style={{width:"90px",height:"auto",marginLeft:"-15px"}}/>
        <p className="mt-2">Built by Petrolheads. Driven by Passion.</p>
      </h5>
      <br></br>
    </Container>
  );
};

export default ContactUs;
