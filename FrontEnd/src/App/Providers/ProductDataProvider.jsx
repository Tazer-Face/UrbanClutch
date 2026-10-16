import React, { useEffect, useState } from 'react'
import { ProductDataContext } from './ProductDataContext'
import { auth } from '../../Firebase/Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { signOut } from 'firebase/auth'


import axios from 'axios'

const ProductDataProvider = ({children}) => {

    const [disable,setDisable]  = useState(false)

    const [productData,setProductData] = useState([])

    const [userData,setUserData] = useState(()=>{
        let data = JSON.parse(localStorage.getItem("userData"));
        return  { cart: (data?.cart || {} ),userDetails:(data?.userDetails || {}) ,userId : (data?.userId || "") ,userOrders :  (data?.userOrders || {}) }
    })
    const [user,setUser] = useState("");
    const [loadingPayment,setLoadingPayment] = useState(false);

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

    const handleLogout = async (userInfo) => {
        try {
            let user = userInfo ;
            let token = await user.getIdToken();
            //"http://localhost:3000/api/userDetails"
            let result = await axios.patch("https://api.urbanclutch.in/api/userDetails",userData,{
                headers : {
                    Authorization : `Bearer ${token}`,
                    'Content-Type' : 'application/json'
                }
            })

            if(result.data.success){
                console.log("updated cart before logout")
            }
            await signOut(auth);
            localStorage.removeItem("userData")
            alert("Logging out");
        } catch (error) {
            console.error(error);
        }
    };


    let quant = Object.values(userData.cart ?? {}).flatMap((ele)=> Object.values(ele)).reduce((total, quantity) => total + quantity, 0) ;
   
    let total =   Object.entries(userData.cart ?? {}).map(([id,data])=>{
            let curProduct = productData.find(ele => ele.productId === id);
            return Object.entries(data).reduce((amount,[size,qty]) =>{
            return amount+(qty*curProduct?.productPrice)
        },0)}).reduce((amount,ele) =>{
            return amount+ele;
        },0)

    let shipping = 100;


    useEffect(()=>{
        
        loadData();
        //http://localhost:3000/api/events
        const serverEvent = new EventSource("https://api.urbanclutch.in/api/events", { withCredentials: true });
        

        serverEvent.addEventListener("ProductData",(res)=>{
    
            let data = JSON.parse(res.data)
            if(data._id){
                setProductData(prev=>(
                    prev.map(product =>(
                        product._id === data._id ? data : product
                    ))
                ))
            } 
            
        })

        serverEvent.addEventListener("OrderData",(res)=>{
            
            let data = JSON.parse(res.data)
            if(data._id){
                setUserData(prev=>{
                        let exists = prev.userOrders.find(ele => ele.RazorPayOrderId === data.RazorPayOrderId);
                        return {...prev,userOrders : exists ?

                            prev.userOrders.map(ele=>
                                ele.RazorPayOrderId === data.RazorPayOrderId ? data : ele  
                            )
                             :
                            [...prev.userOrders,data]
                        }
                    }
                )
            } 
            
        })

        serverEvent.onerror = async () => {
            console.log("SSE connection error:", serverEvent.readyState);

            if (serverEvent.readyState === EventSource.CLOSED) {
                try {
                await loadData();
                } catch (err) {
                console.error("Fallback refresh failed:", err);
                }
            }
        };


        return ()=>{
            serverEvent.close()
        }

        
    },[user])

    useEffect(()=>{

        let unSubscribe = onAuthStateChanged(auth,async(userInfo)=>{
            try{

                if(userInfo){
                    try{
                            setUser(userInfo);
                            
                        }catch(err){
                            console.error(err)
                        }
                    
                }
                else{
                    setUser(null);
                    setUserData({ cart: {} ,userDetails:{} ,userId : "",userOrders :  {}})
                    localStorage.removeItem("userData")
                }
               
            }catch(err){
                console.error(err)
            }
            
        })

        return unSubscribe;
        
        
    },[])

    

    useEffect(() => {
        localStorage.setItem("userData",JSON.stringify(userData))
    }, [userData]);


  return (
    <ProductDataContext.Provider
        value={{productData , userData , setUserData ,quant ,total ,shipping ,setProductData , user , handleLogout ,loadingPayment , setLoadingPayment ,disable,setDisable}}
    >
        {children}
    </ProductDataContext.Provider>
  )
}

export default ProductDataProvider
