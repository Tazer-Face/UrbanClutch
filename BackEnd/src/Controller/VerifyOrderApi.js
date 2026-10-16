
export class VerifyOrder {
    constructor(service){
        this.service = service;
    }

    async verifyOrder(req,res,next){
        try{
          
          const data = await this.service.verifyPayment(req.body);
            
            res.status(201).send({success:true,data: data ,message:"Order verified successfully"})
        }
        catch(err){
            next(err)
        }
        
    }
}