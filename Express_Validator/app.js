const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const validators = require("./middlewares/validator.middleware.js");
const app = express();

app.use(express.json());

app.post("/register",validators.registerValidationRules,(req,res)=>{
    const {username,email,password} = req.body;
     
});

app.listen(3000,()=>{
    console.log("Server is running on port : 3000");
});