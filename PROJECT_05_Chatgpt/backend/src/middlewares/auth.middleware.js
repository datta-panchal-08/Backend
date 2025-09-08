import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';
export const isAuthenticated = async(req,res,next)=>{
    try {
        const {token} = req.cookies;

        if(!token){
            return res.status(401).json({
                message:"Unauthorized!",
                success:false
            })
        }
        
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            const user = await userModel.findById(decoded.id);
            const userResponse = user.toObject();
            delete userResponse.password;
            req.user = userResponse;
            next();
        } catch (error) {
             return res.status(401).json({
                message:"Unauthorized!",
                success:false
            })
        }

    } catch (error) {
        console.log("Auth Middleware Error : ",error);
    }
}