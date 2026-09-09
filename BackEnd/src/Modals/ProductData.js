import mongoose from 'mongoose';

const dataSchema = mongoose.Schema({
    productId : {type : String, required : true , unique: true},
    productTitle: {type : String, required : true},
    productDescription: {type : String, required : true},
    inventory: {S : {type :Number, default : 0 , min : 0} , 
                M : {type :Number, default : 0 , min : 0} , 
                L : {type :Number, default : 0 , min : 0}
                },
    productCardImage : {type : String , default : null},
    productCarasoleImage :  {
        type: [String],
        default: []
    },
    productPrice : {type : Number, required : true , min : 0},
    
}) 

export default mongoose.model('Product', dataSchema);


