import React from 'react'

import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { useContext } from 'react';
import { ProductDataContext } from '../../App/Providers/ProductDataContext';
import ProductCarousel from '../../Shared/Components/ProductCarousel';
import ProductCards from '../../Shared/Components/ProductCards';
import { useProductNavigate } from '../../Shared/Hooks/useProductNavigate';
import FooterHome from './Components/FooterHome';

const UrbanClutchLogo = "/Products/CAROUSEL/UrbanClutchLogo.jpg"
const Ferrari3 = "/Products/CAROUSEL/Ferrari3.jpg"
const Mazda3  = "/Products/CAROUSEL/Mazda3.jpg"
const Rexy3= "/Products/CAROUSEL/Rexy3.jpg"
const Rexy4 = "/Products/CAROUSEL/Rexy4.jpg"
const Roxy5 = "/Products/CAROUSEL/Roxy5.jpg"
const Roxy6 = "/Products/CAROUSEL/Roxy6.jpg"


const Home = () => {
  
  const carousel = [UrbanClutchLogo,Rexy3,Mazda3,Roxy6,Rexy4,Ferrari3,Roxy5]
  const {productData} = useContext(ProductDataContext)
  const navigate = useNavigate();

  const {viewProduct} = useProductNavigate()

  

  function navigatePage(id){
    navigate(`/viewProduct/${id}`);
  }
  return (
    <>
    <Container className='mt-2 custom-container'>
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
    <FooterHome/>
    </>
  )
}

export default Home