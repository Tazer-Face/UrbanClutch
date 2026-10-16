import React, { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useContext } from 'react'
import { ProductDataContext } from '../../App/Providers/ProductDataContext'
import { useProductNavigate } from '../../Shared/Hooks/useProductNavigate'

const OrdersPage = () => {
    
    const {userData} = useContext(ProductDataContext)
    const {viewProduct} = useProductNavigate();

  return (
    <Container >
        <ol >
        { userData?.userOrders?.[0]?._id !== undefined ?
            userData.userOrders.map(ele=>(
                
                    <li key={ele._id}>
                        <div  className="d-flex flex-columns align-items-center justify-content-start gap-5 Orders cartCheckoutMedia mt-4">    
                            <div className="d-flex flex-column align-items-start justify-content-start gap-3 ">
                                <div className="d-flex align-items-center justify-content-start gap-2 ">
                                    <p style={{ fontSize: "0.9rem" }} className='m-0 fw-bold'>ORDER ID : </p>
                                    <p className='m-0'>{ele._id}</p>
                                </div>
                                <div className="d-flex align-items-center justify-content-start gap-2 ">
                                    <h6 className='m-0'>STATUS : </h6>
                                    <p className='m-0'>{ele.status}</p>
                                </div>
                                <div className="d-flex align-items-center justify-content-start gap-2 ">
                                    <h6 className='m-0'>ORDER PLACED AT : </h6>
                                    <p className='m-0'>{new Date(ele.createdAt).toLocaleString("en-IN", 
                                                        {
                                                            timeZone: "Asia/Kolkata" 
                                                        })}
                                    </p>
                                </div>
                                <div className="d-flex align-items-center justify-content-start gap-2 ">
                                    <h6 className='m-0'>TOTAL AMOUNT : </h6>
                                    <p className='m-0'>₹ {ele.Total}</p>
                                </div>
                                <Button onClick={()=>{console.log(ele._id);viewProduct("orderDetails",ele._id)}}>
                                    OPEN ORDER
                                </Button>
                            </div>
                        </div>
                    </li>
               
            ))
            
            
            : 
            <div className="d-flex align-items-center justify-content-center w-100 vh-100">
                <h2>NO ORDERS AVAILABLE :/</h2>
            </div>
        }
        </ol>
    </Container>
  )
}

export default OrdersPage