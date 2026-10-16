export function ValidateReqBody(req,res,next){

        if(!req.body || Object.keys(req.body).length === 0){
            return res.status(400).json({message : "Invalid req body"})
        }
        next();

}