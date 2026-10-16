export function checkCart(productData,cartData){

    let productMap = new Map(productData.map(ele =>([ele.productId,ele.inventory])));

    let checkedCart = Object.entries(cartData).filter(([id]) => productMap.has(id)).map(([id,size])=>{
        
        let curProduct = productMap.get(id)

        return { productId : id,
                sizes : Object.fromEntries(Object.entries(size).map(([key,value]) =>{
                
                    
                    return [key , Math.min(value,curProduct[key])]
                })
            )
        }   
    })

    return checkedCart;
}