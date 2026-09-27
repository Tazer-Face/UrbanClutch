import React from 'react'

import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { useContext } from 'react';
import { ProductDataContext } from '../../App/Providers/ProductDataContext';
import ProductCarousel from '../../Shared/Components/ProductCarousel';
import ProductCards from '../../Shared/Components/ProductCards';
import { useProductNavigate } from '../../Shared/Hooks/useProductNavigate';
import UrbanClutchLogo from "../../Assets/Products/CAROUSEL/UrbanClutchLogo.jpg"
import Ferrari3 from "../../Assets/Products/CAROUSEL/Ferrari3.jpg"
import Mazda3 from "../../Assets/Products/CAROUSEL/Mazda3.jpg"
import Rexy3 from "../../Assets/Products/CAROUSEL/Rexy3.jpg"
import Rexy4 from "../../Assets/Products/CAROUSEL/Rexy4.jpg"
import Roxy5 from "../../Assets/Products/CAROUSEL/Roxy5.jpg"
import Roxy6 from "../../Assets/Products/CAROUSEL/Roxy6.jpg"
import Footer from './Components/Footer';


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
    <Footer/>
    </>
  )
}

export default Home