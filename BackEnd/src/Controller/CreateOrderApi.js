
export class CreateOrder {
    constructor(service){
        this.service = service;
    }

    async addOrder(req,res,next){
        try{
 
          let userData = {userObj : req.user , userDetails : req.body || {}};
          
          const data = await this.service.createOrder(userData);

          if(data.status === "already_paid"){
            return res.status(200).json({
                                status: "already_paid",
                                message: "This checkout has already been paid.",
                                orderId: data.RazorPayOrderId
                            });
          }

          
            
            res.status(201).send({success:true,data: data ,message:"Order placed successfully"})
        }
        catch(err){
            next(err)
        }
        
    }
}