import React,{useEffect, useState} from "react";
import { Button} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { useContext } from "react";
import { ProductDataContext } from "../../../App/Providers/ProductDataContext";
import { useCart } from "../../../Shared/Hooks/useCart";
import { useDisableSize } from "../Hooks/useDisableSize";


const ProductDetails = ({curProducData}) => {

  const { cartData ,productData } = useContext(ProductDataContext);
  const [size, setSize] = useState("");
  const {disbaleSize,sizeAva} = useDisableSize();
  const {addUpdate} = useCart();

  let curcartData;

  function AddToCart() {
    if (size === "") {
      alert("Please select a size");
      return;
    }

    curcartData = cartData?.cartData?.[curProducData.productId]?.[size];
    curcartData === undefined ? addUpdate(curProducData.productId,size) : null;
  }
 

  function handleSizeChange(selectedSize) {

    setSize(selectedSize);
  }

  useEffect(()=>{
    disbaleSize(curProducData)
  },[productData])


  return (
    <div className="col-12 col-xl-4  mt-5 mt-xl-2 d-flex align-items-start mt-3 mb-3">
          <div className="d-flex flex-column w-100 h-100 gap-3 justify-content-start mt-1">
            <h3 className="fw-bold">{curProducData?.productTitle}</h3>

            <h5>{curProducData?.productDescription}Regular Fit cotton bio-washed premium Tshirt</h5>

            <div className="border-top border-secondary"></div>

            <h2 className="fw-bold">₹{curProducData?.productPrice}</h2>
            
            
            <div className="d-flex flex-row gap-3 align-items-center justify-content-between">
              <div className="d-flex flex-row gap-3 align-items-center justify-content-start">
                <Button
                    className={`${size === "S" ? "selected-btn" : "btnViewProduct"} ${!sizeAva.S ? "disabled-size" : ""}`}
                    onClick={() => handleSizeChange("S")}
                    disabled={!sizeAva.S}
                >
                    S
                </Button>
                <Button
                    className={`${size === "M" ? "selected-btn" : "btnViewProduct"} ${!sizeAva.M ? "disabled-size" : ""}`}
                    onClick={() => handleSizeChange("M")}
                    disabled={!sizeAva.M}
                >
                    M
                </Button>
                <Button
                    className={`${size === "L" ? "selected-btn" : "btnViewProduct"} ${!sizeAva.L ? "disabled-size" : ""}`}
                    onClick={() => handleSizeChange("L")}
                    disabled={!sizeAva.L}
                >
                    L
                </Button>
                </div>
                { !sizeAva.addToCart &&
                  <h4 style={{color : "red"}}>OUT OF STOCK</h4>
                }
                
            </div>
            
            <div className="d-flex flex-row gap-3 align-items-center justify-content-between">
              <Button className="mt-2 w-100 cartAddPayBtn" 
                      onClick={AddToCart}
                      disabled={!sizeAva.addToCart}
              >
                ADD TO CART
              </Button>
              
            </div>

            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Size Chart</Accordion.Header>
                <Accordion.Body>
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Chest (in)</th>
                        <th>Length (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>S</td>
                        <td>38</td>
                        <td>27</td>
                      </tr>
                      <tr>
                        <td>M</td>
                        <td>40</td>
                        <td>28</td>
                      </tr>
                      <tr>
                        <td>L</td>
                        <td>42</td>
                        <td>29</td>
                      </tr>
                    </tbody>
                  </table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Features</Accordion.Header>
                <Accordion.Body>
                  <ol>
                    <li>
                      180 GSM Cotton: Made with 180 GSM cotton fabric that
                      offers a comfortable balance of softness, durability, and
                      breathability for everyday wear.
                    </li>
                    <li>
                      Bio-Washed Finish: Bio-washed for a smoother, softer feel
                      with reduced surface fuzz, giving the T-shirt a premium
                      finish and comfortable feel against the skin.
                    </li>
                    <li>
                      Comfortable Fit: Designed with a classic crew neckline and
                      short sleeves, providing an easy, relaxed fit that works
                      well for casual everyday styling.
                    </li>
                  </ol>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Size & Fit</Accordion.Header>
                <Accordion.Body>Fit: Regular Fit</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Material & Care</Accordion.Header>
                <Accordion.Body>
                  <ol>
                    <li>100% Cotton</li>
                    <li>Bio-washed</li>
                    <li>180 GSM</li>
                    <li>Machine Wash Cold Gentle Cycle</li>
                    <li>Do Not Bleach</li>
                    <li>Tumble Dry Low</li>
                    <li>Do Not Dry Clean</li>
                    <li>Wash With Similar Colors</li>
                    <li>Do Not Iron On Label</li>
                    <li>Made In India</li>
                  </ol>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
  )
}

export default ProductDetails