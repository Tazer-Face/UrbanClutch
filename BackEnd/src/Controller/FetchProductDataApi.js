
export class FetchProductDetails{
    constructor(service){
        this.service = service;
    }

    async fetchData(req,res,next){
        try{
          const data = await this.service.getProductData();
            
            res.status(200).send({success:true,data: data ,message:"Data fetched successfully"})
        }
        catch(err){
            next(err)
        }
        
    }
}