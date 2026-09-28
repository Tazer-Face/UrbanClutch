import React from 'react'
import Carousel from "react-bootstrap/Carousel";

const ProductCarousel = ({arr,cssClass}) => {
  return (
    <Carousel slide={true} className="mb-1">
      {arr?.map((ele) => (
          <Carousel.Item key={ele}>
            <div className={cssClass}>
              <img src={ele} alt="Product" className="carousel-image" />
            </div>
          </Carousel.Item>
        ))}
    </Carousel>
  )
}

export default ProductCarousel