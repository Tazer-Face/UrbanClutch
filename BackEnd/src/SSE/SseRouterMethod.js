import { adminAuth } from '../Config/FirebaseConfig.js';
import {
    addClients,
    removeClient
} from '../SSE/BroadcastDbUpdates.js'

export async function sseRouterMethod(req,res){

    try{

        const sessionCookie = req.cookies?.session;

        if (!sessionCookie) {
        return res.status(401).json({message:"No session available"});
        }


        const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);

        
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        res.flushHeaders();


        res.write(`data: ${JSON.stringify({ connected: true })}\n\n`);

        addClients(decodedToken.uid,res);

        req.on("close", () => {
            removeClient(decodedToken.uid,res);
        });

    }catch(err){
        if(!res.headersSent){
            res.status(401).json("Unable to authenticate user");
        }
        res.end();
        console.error(err)
    }

}