export default class UpdateCreateUserDetailsS{

    constructor(userRepository1,service1,service2){
        this.userRepository1 = userRepository1;
        this.service1 = service1;
        this.service2 = service2;

    }

    async updateCreateUserDetails(data){
        try{


            let curUser = await this.userRepository1.getUser(data.userObj.uid)   

            if(!curUser){

                let result1 =await  this.service1.createUserDetails(data);
                return result1;
            }

            let result2 = this.service2.mergeUserCart(data,curUser);
            

            return result2;

        }catch(err){
            console.error(err);
            throw err;
        }
    }
}