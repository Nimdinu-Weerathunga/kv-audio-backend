import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import userRouter from "./routes/userRouter.js"
import productRouter from "./routes/productRouter.js"
import jwt from "jsonwebtoken"

const app = express();
app.use(bodyParser.json());

// middleware to verify JWT and set req.user
app.use((req,res,next)=>{
    let token = req.header("authorization");
    console.log(token);
    
    if(token != null){
        token = token.replace("Bearer ","");

        jwt.verify(token,"kv secret key",(err,decoded)=>{ 
            if(!err){
                req.user = decoded;
            }
        });
    }
    next();
});

// connect to MongoDB
let mongoUrl = "mongodb+srv://nimdinuweerathunga_db_user:123@cluster0.qnnzntn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 ";
mongoose.connect(mongoUrl);

// connection object
const connection = mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB connection established successful")
});

// routes
app.use("/api/users",userRouter);
app.use("/api/products",productRouter);

// start server
app.listen(3000,()=>{
    console.log("server started at port 3000");
});

// git init