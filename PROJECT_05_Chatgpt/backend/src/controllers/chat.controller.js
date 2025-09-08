import { chatModel } from "../models/chat.model.js"

export const createChat = async(req,res)=>{
    try {
        const{title} = req.body;
        const user = req.user;
        if(!title){
            return res.status(400).json({
                message:"required title",
                succcess:false
            })
        }

        const chat = await chatModel.create({
            user:user._id,
            title
        });

        res.status(201).json({
            message:"chat created successfully!",
            success:true,
            chat
        })

    } catch (error) {
        console.log("Chat Creating Error : ",error);
        res.status(500).json({
            message:"Something went wrong",
            success:false
        })
    }
}