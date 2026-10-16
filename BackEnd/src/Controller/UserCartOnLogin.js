export class UpdateCreateUserDetailsOnLogin{
    constructor(service1){
        this.service1 = service1;
    }

    async createUpdateUser(req,res,next){

        try{
            let data = {userObj : req.user , userDetails : req.body || {}};
            let result = await this.service1.updateCreateUserDetails(data);
            res.status(200).send({message : "Login successful , cart data updated",success : true , data : result})

        }catch(err){
            next(err)
        }
    }

}