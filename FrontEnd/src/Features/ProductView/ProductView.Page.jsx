import React,{useEffect, useState} from "react";
import { Button, ButtonToolbar, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "react-bootstrap/Accordion";
import { useContext } from "react";
import { ProductDataContext } from "../../App/Providers/ProductDataContext";
import ProductCarousel from "../../Shared/Components/ProductCarousel";
import ProductDetails from "./Components/ProductDetails";

const ProductView = () => {

  const { id } = useParams();
  const { productData} = useContext(ProductDataContext);

  let curProducData = productData.filter((ele) => ele.productId === id)[0];
  

  return (
    <Container className="mb-4">
      { productData && productData.length > 0   ?
        <div className="row gx-5">
          <div className="col-12 col-xl-8 mt-3">
            <ProductCarousel  arr={curProducData.productCarasoleImage} cssClass="carousel-image-container" />
          </div>
          <ProductDetails curProducData={curProducData}/>
        </div> :
        <div className="d-flex flex-column align-items-center justify-content-center w-100 vh-100">
          <h2>LOADING..</h2>
        </div>
        
      }
    </Container>
  );
};

export default ProductView;
