let clients = new Map();

export function addClients(uid,user){
    if(!clients.has(uid)){
        clients.set(uid,new Set())
    }

     clients.get(uid).add(user)
}

export function removeClient(uid,res) {
    let user = clients.get(uid)

    if(!user) return

    user.delete(res)

    if(user.size === 0) clients.delete(uid)
}

export function broadcastDbUpdates(data,event){

    if(event === "Product"){
        for (const [key,value] of clients) {

            for(let userConnections of value){
                try{
                    userConnections.write(`event: ProductData\n`);
                    userConnections.write(`data: ${JSON.stringify(data)}\n\n`);

                }catch(err){
                    removeClient(key,userConnections)
                }
            }
            
            
            
        }
    }
    
    else if(event === "Order"){

        let client = clients.get(data.FirebaseUid)
        
        
            if(!client || client.length === 0) return

            for (let connections of client){
                try{
                    connections.write(`event: OrderData\n`);
                    connections.write(`data: ${JSON.stringify(data)}\n\n`);
                }catch(err){
                    removeClient(data.FirebaseUid,connections)
                }
            }  

    }
}