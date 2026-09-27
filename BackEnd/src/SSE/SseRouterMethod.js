import {
    addClients,
    removeClient
} from '../SSE/BroadcastDbUpdates.js'

export function sseRouterMethod(req,res){

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders();

     res.write(`data: ${JSON.stringify({ connected: true })}\n\n`);

    addClients(res);

    req.on("close", () => {
        removeClient(res);
    });


}