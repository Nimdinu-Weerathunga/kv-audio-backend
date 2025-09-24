import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function registerUser(req, res) {

   const data = req.body; // Get user data from request body


    data.password = bcrypt.hashSync(data.password, 10); // Hash the password
    const newUser = new User(data); // Create a new User instance

    newUser.save() // Save to the database
        .then(() => {
            res.json("User registered successfully");
        })
        .catch((error) => {
            res.status(500).json({error : "User registeration failed"});
        });
}
 
export function loginUser(req, res) {
    // Login logic here
    const data = req.body;

    User.findOne({ email: data.email })
        .then((user) => {
            if(user == null){
                res.status(404).json({error : "User not found"});
            } else {

                const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);
                
                if(isPasswordCorrect){
                    const token = jwt.sign({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role
                    }, "kv secret key");
                    res.json({message:"Login successful", token: token});
                } else {
                    res.status(401).json({error : "Login failed"});
                }
        }  
        })
        
}

//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJLYW1hbCIsImxhc3ROYW1lIjoiRG9lIiwiZW1haWwiOiJrYW1hbDEyQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc1ODY0NDI3N30.9rdFx020Ju055AnPiAEovlq7cCUvfbuNvz6PcszRmqk"