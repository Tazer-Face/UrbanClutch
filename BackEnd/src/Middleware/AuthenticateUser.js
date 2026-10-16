import { adminAuth } from "../Config/FirebaseConfig.js";

export async function AuthenticateUser(req,res,next){
    try{
        let auth = req.headers.authorization

        if(!auth || !auth.startsWith("Bearer")){
            return res.status(400).json({message : "Invalid request" , success : false})
        }

        let token = auth.split(" ")[1];
        const decodedToken = await adminAuth.verifyIdToken(token);
        const sessionCookie = await adminAuth.createSessionCookie(
                token,
                { expiresIn: 5 * 24 * 60 * 60 * 1000 }
                );
        req.user = decodedToken;
        res.cookie("session", sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 5 * 24 * 60 * 60 * 1000
        });
        next()

    }catch(err){
        console.error(err);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}