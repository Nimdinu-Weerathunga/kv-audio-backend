import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
});

// model
const Product = mongoose.model("products",productSchema); // collection name products , structure productSchema

// export the model
export default Product;