import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    profilePicture :{
        type:String,
        required:true,
        default:""
    },
    isApproved:{
        type:Boolean,
        required:true,
        default:false
    }
});

// model
const Review = mongoose.model("reviews",reviewSchema); // collection name reviews , structure reviewSchema

// export the model
export default Review;