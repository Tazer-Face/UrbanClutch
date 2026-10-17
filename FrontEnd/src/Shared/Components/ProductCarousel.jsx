import React from 'react'
import Carousel from "react-bootstrap/Carousel";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


const ProductCarousel = ({arr,cssClass}) => {
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  function openImage(image) {
    setSelectedImage(image);
    setShowImage(true);
  }

  function closeImage() {
    setShowImage(false);
  }

  return (
    <>
      <Carousel slide={true} className="mb-1">
        {arr?.map((ele) => (
            <Carousel.Item key={ele}>
              <div className={cssClass}>
                <img src={ele} alt="Product" className="carousel-image"  onClick={() => openImage(ele)} />
              </div>
            </Carousel.Item>
          ))}
      </Carousel>

      <Modal
        show={showImage}
        onHide={closeImage}
        fullscreen
        className="product-image-modal"
      >
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body className="d-flex align-items-center justify-content-center p-2">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full-screen product"
              className="fullscreen-product-image"
            />
          )}
        </Modal.Body>
      </Modal>
  </>
  )
}

export default ProductCarousel