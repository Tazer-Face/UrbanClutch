import { AppError } from "../Utils/ErrorClass.js";

class GetProductDataS{
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async getProductData(){
        try{
            let data = await this.userRepository.getProductData();
            
            if ( !data || data.length === 0){
                throw new AppError("No products found", 404);
            }

            return data;
        }
        catch(err){
            if (err instanceof AppError) {
                throw err;
            }

            throw new AppError(
                "Unable to retrieve product data from database",
                500,
                err
            );
        }
    }
}

export default GetProductDataS