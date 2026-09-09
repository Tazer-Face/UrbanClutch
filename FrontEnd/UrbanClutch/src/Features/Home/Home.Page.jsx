import React from 'react'

import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { useContext } from 'react';
import { ProductDataContext } from '../../App/Providers/ProductDataContext';
import ProductCarousel from '../../Shared/Components/ProductCarousel';
import ProductCards from '../../Shared/Components/ProductCards';
import { useProductNavigate } from '../../Shared/Hooks/useProductNavigate';
import UrbanClutchLogo from "../../Assets/Products/CAROUSEL/UrbanClutchLogo.jpg"
import Ferrari2 from "../../Assets/Products/CAROUSEL/Ferrari2.jpg"
import Ferrari3 from "../../Assets/Products/CAROUSEL/Ferrari3.jpg"
import Lambo2 from "../../Assets/Products/CAROUSEL/Lambo2.jpg"

const Home = () => {
  
  const carousel = [UrbanClutchLogo,Ferrari2,Ferrari3,Lambo2]
  const {productData} = useContext(ProductDataContext)
  const navigate = useNavigate();

  const {viewProduct} = useProductNavigate()

  

  function navigatePage(id){
    navigate(`/viewProduct/${id}`);
  }
  return (
    <Container className='mt-2 mb-5 custom-container'>
      <ProductCarousel arr={carousel} cssClass="carousel-image-container-home"/>
      <div className="Title">
        <h3 className="my-4 mt-3 mt-sm-5 ">PRODUCTS</h3>
      </div>
      <div className="row g-5">
        {
          productData.map((ele)=>(

          <div className="col-12 px-3 col-sm-6 col-md-4 cardWidth" key={ele.productId}>
          <ProductCards product={ele} navigatePage={()=>viewProduct("viewProduct",ele.productId)}/>
          </div>

          ))
        }
      </div>
    </Container>
  )
}

export default Home