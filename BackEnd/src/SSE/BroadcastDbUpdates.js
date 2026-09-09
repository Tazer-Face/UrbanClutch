let clients = new Set();

export function addClients(user){
    clients.add(user)
}

export function removeClient(user) {
    clients.delete(user);
}

export function broadcastDbUpdates(data){
    for (const client of clients) {
        client.write(`data: ${JSON.stringify(data)}\n\n`);
    }
}