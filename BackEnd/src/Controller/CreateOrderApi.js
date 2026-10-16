
export class CreateOrder {
    constructor(service){
        this.service = service;
    }

    async addOrder(req,res,next){
        try{
 
          let userData = {userObj : req.user , userDetails : req.body || {}};
          
          const data = await this.service.createOrder(userData);

          
            
            res.status(201).send({success:true,data: data ,message:"Order placed successfully"})
        }
        catch(err){
            next(err)
        }
        
    }
}