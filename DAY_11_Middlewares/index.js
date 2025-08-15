import express from 'express';
import dotenv from 'dotenv';
import mainRoutes from './routes/index.routes.js';
const app = express();
dotenv.config();

app.use((req,res,next)=>{
    console.log("this middleware is between app and route");
    next();
})

app.listen(3000,()=>{
    console.log("Server is running on port : 3000");
});

