
export class CreateOrder {
    constructor(service){
        this.service = service;
    }

    async addOrder(req,res,next){
        try{
          
          const data = await this.service.createOrder(req.body);
            
            res.status(201).send({success:true,data: data ,message:"Order placed successfully"})
        }
        catch(err){
            next(err)
        }
        
    }
}