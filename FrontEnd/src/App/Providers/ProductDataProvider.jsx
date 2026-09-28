import React, { useEffect, useState } from 'react'
import { ProductDataContext } from './ProductDataContext'

import axios from 'axios'

const ProductDataProvider = ({children}) => {

    const [productData,setProductData] = useState([])

    async function loadData(){
        let data;
        try{
            //data = await axios.get("http://localhost:3000/api/productData");
            data = await axios.get("https://urbanclutch.onrender.com/api/productData");
            
            setProductData(data.data.data);
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
        
        loadData();

        // const serverEvent = new EventSource("http://localhost:3000/api/events/products");
        const serverEvent = new EventSource("https://urbanclutch.onrender.com/api/events/products");

        serverEvent.addEventListener("message",(res)=>{
            let data = JSON.parse(res.data)
            console.log("SSE EVENT:", data);
            if(data._id){
                setProductData(prev=>(
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
        console.log("STATE UPDATED:", productData);
    }, [productData]);


  return (
    <ProductDataContext.Provider
        value={{productData , cartData , setCartData ,quant ,total ,shipping ,setProductData}}
    >
        {children}
    </ProductDataContext.Provider>
  )
}

export default ProductDataProvider
