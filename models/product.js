import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    key:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
        default:"uncategorized"
    },
    dimensions:{
        type:String,
        required:true
    }, 
    description:{
        type:String,
        required:true
    },
    availability:{
        type:Boolean,
        required:true,
        default:true
    },
    image:{
        type:[String],
        required:true,
        default:[""]
    }
});

// model
const Product = mongoose.model("products",productSchema); // collection name products , structure productSchema

// export the model
export default Product;