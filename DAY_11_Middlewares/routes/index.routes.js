import express from 'express';
const router = express.Router();

router.use((req,res,next)=>{
    console.log("this middleware is between route and api");
    next();
})

router.get("/",(req,res)=>{
    res.json({
        message:"Welcome To The New Chapter Middlewares"
    })
})

export default router;