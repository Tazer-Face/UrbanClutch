import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductCards = ({product,navigatePage}) => {
  return (
    <Card key={product.productId}>
      <Card.Img variant="top" src={product.productCardImage} />
      <Card.Body>
        <Card.Title className="descriptionTitle">{product.productTitle}</Card.Title>
        <Card.Text className="description">{product.productDescription}</Card.Text>
        <Button
          style={{
            backgroundColor: "#000000",
            borderColor: "#3d3d3e",
            color: "#ffffff",
          }}
          onClick={navigatePage}
        >
          View Product
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCards;
