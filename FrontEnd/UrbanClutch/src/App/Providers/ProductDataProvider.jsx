import React, { useEffect, useState } from 'react'
import { ProductDataContext } from './ProductDataContext'
import FrontViewTshirt from '../../Assets/Products/PRODUCT CAROUSEL/COMMON IMAGES/FrontViewTshirt.jpg'
import Tshirtlogo from '../../Assets/Products/PRODUCT CAROUSEL/COMMON IMAGES/Tshirtlogo.jpg'
import FerrariCard from '../../Assets/Products/CARD/Ferrari.JPG'
import LamboCard from '../../Assets/Products/CARD/Lambo.JPG'
import MazdaCard from '../../Assets/Products/CARD/Mazda.JPG'
import RexyCard from '../../Assets/Products/CARD/Rexy.JPG'
import RoxyCard from '../../Assets/Products/CARD/Roxy.JPG'
import Ferrari1 from '../../Assets/Products/PRODUCT CAROUSEL/FERRARI/Ferrari1.jpg'
import Ferrari2 from '../../Assets/Products/PRODUCT CAROUSEL/FERRARI/Ferrari2.jpg'
import Ferrari3 from '../../Assets/Products/PRODUCT CAROUSEL/FERRARI/Ferrari3.jpg'
import Lambo1 from '../../Assets/Products/PRODUCT CAROUSEL/LAMBORGINI/Lambo1.jpg'
import Lambo2 from '../../Assets/Products/PRODUCT CAROUSEL/LAMBORGINI/Lambo2.jpg'
import Lambo3 from '../../Assets/Products/PRODUCT CAROUSEL/LAMBORGINI/Lambo3.jpg'
import Mazda1 from '../../Assets/Products/PRODUCT CAROUSEL/MAZDA RX7/Mazda1.jpg'
import Mazda2 from '../../Assets/Products/PRODUCT CAROUSEL/MAZDA RX7/Mazda2.jpg'
import Mazda3 from '../../Assets/Products/PRODUCT CAROUSEL/MAZDA RX7/Mazda3.jpg'
import Rexy1 from '../../Assets/Products/PRODUCT CAROUSEL/REXY/Rexy1.jpg'
import Rexy2 from '../../Assets/Products/PRODUCT CAROUSEL/REXY/Rexy2.jpg'
import Rexy3 from '../../Assets/Products/PRODUCT CAROUSEL/REXY/Rexy3.jpg'
import Rexy4 from '../../Assets/Products/PRODUCT CAROUSEL/REXY/Rexy4.jpg'
import Rexy5 from '../../Assets/Products/PRODUCT CAROUSEL/REXY/Rexy5.jpg'
import Roxy1 from '../../Assets/Products/PRODUCT CAROUSEL/ROXY/Roxy1.jpg'
import Roxy2 from '../../Assets/Products/PRODUCT CAROUSEL/ROXY/Roxy2.jpg'
import Roxy3 from '../../Assets/Products/PRODUCT CAROUSEL/ROXY/Roxy3.jpg'
import Roxy4 from '../../Assets/Products/PRODUCT CAROUSEL/ROXY/Roxy4.jpg'
import Roxy5 from '../../Assets/Products/PRODUCT CAROUSEL/ROXY/Roxy5.jpg'
import Roxy6 from '../../Assets/Products/PRODUCT CAROUSEL/ROXY/Roxy6.jpg'
import axios from 'axios'


const ProductDataProvider = ({children}) => {

  const [productData,setProductData] = useState([
    {

        productId : "1",
        productTitle : "FERRARI F40",
        productDescription : "Iconic Ferrari F40 graphic — raw speed, racing heritage, and fearless attitude." ,
        inventory : {S : 1 , M : 1 , L : 1},
        productCardImage : FerrariCard,
        productCarasoleImage : [FrontViewTshirt,Tshirtlogo,Ferrari1,Ferrari2,Ferrari3],
        productPrice : 499
    },
    {
        productId : "2",
        productTitle : "LAMBORGINI MURCIELAGO SV",
        productDescription : "Bold Lamborghini Murciélago Sv graphic — raw V12 power, speed, and Italian attitude." ,
        inventory : {S : 2 , M : 4 , L : 4},
        productCardImage : LamboCard,
        productCarasoleImage : [FrontViewTshirt,Tshirtlogo,Lambo2,Lambo3],
        productPrice : 499
    },
    {
        
        productId : "3",
        productTitle : "MAZDA RX-7",
        productDescription : "Iconic Mazda RX-7 VeilSide graphic — JDM culture, drift energy, and street-racing attitude." ,
        inventory : {S : 2 , M : 4 , L : 4},
        productCardImage : MazdaCard,
        productCarasoleImage : [FrontViewTshirt,Tshirtlogo,Mazda2,Mazda3],
        productPrice : 499
    },
    {
        productId : "4",
        productTitle : "REXY - PORSHE 911 GT3 R",
        productDescription : "Porsche 911 GT3 R aka REXY graphic — race-bred performance, aggressive aero, and raw track energy." ,
        inventory : {S : 2 , M : 4 , L : 4},
        productCardImage : RexyCard,
        productCarasoleImage : [FrontViewTshirt,Tshirtlogo,Rexy1,Rexy2,Rexy3,Rexy4,Rexy5],
        productPrice : 499
    },
    {
        productId : "5",
        productTitle : "ROXY - PORSHE 911 GT3 R",
        productDescription : "Porsche 911 GT3 R aka ROXY graphic — bold pink racing style, track-ready power, and fearless attitude." ,
        inventory : {S : 2 , M : 4 , L : 4},
        productCardImage : RoxyCard,
        productCarasoleImage : [FrontViewTshirt,Tshirtlogo,Roxy1,Roxy2,Roxy3,Roxy4,Roxy5,Roxy6],
        productPrice : 499
    }
  ])

    const [productDataServer,setProductDataServer] = useState([])

    async function loadData(){
        let data;
        try{
            data = await axios.get("http://localhost:3000/api/productData");
            
            setProductDataServer(data.data.data);
        }
        catch(err){
            console.error("Unable to fetch product data from server : ",err)
        }
        
    }

    



    const [cartData,setCartData] = useState(() =>{
        let ldata = localStorage.getItem("cartDataL")

        return ldata ? JSON.parse(ldata) :  { cartData: {},userDetails: {} }
    })


    let quant = Object.values(cartData.cartData ?? {}).flatMap((ele)=> Object.values(ele)).reduce((total, quantity) => total + quantity, 0) ;
    let total =   Object.entries(cartData.cartData ?? {}).map(([id,data])=>{
            let curProduct = productData.find(ele => ele.productId === id);
            return Object.entries(data).reduce((amount,[size,qty]) =>{
            return amount+(qty*curProduct?.productPrice)
        },0)}).reduce((amount,ele) =>{
            return amount+ele;
        },0)

    let shipping = 100;


    useEffect(()=>{
        
        localStorage.setItem("cartDataL", JSON.stringify(cartData));
        loadData();

        const serverEvent = new EventSource("http://localhost:3000/api/events/products");


        serverEvent.addEventListener("message",(res)=>{
            let data = JSON.parse(res.data)
            console.log("SSE EVENT:", data);
            if(data._id){
                setProductDataServer(prev=>(
                    prev.map(product =>(
                        product._id === data._id ? data : product
                    ))
                ))
            } 
            
        })


        return ()=>{
            serverEvent.close()
        }




        
    },[])

    useEffect(()=>{
        
        localStorage.setItem("cartDataL", JSON.stringify(cartData));
        
    },[cartData])

    
    useEffect(() => {
        console.log("STATE UPDATED:", productDataServer);
    }, [productDataServer]);


  return (
    <ProductDataContext.Provider
        value={{productData , cartData , setCartData ,quant ,total ,shipping ,setProductData}}
    >
        {children}
    </ProductDataContext.Provider>
  )
}

export default ProductDataProvider