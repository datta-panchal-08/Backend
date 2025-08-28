import { Post } from "../models/post.model.js";
import { generateCaption } from "../service/ai.service.js";
import { uploadFile } from "../service/storage.service.js";
import {v4 as uuid4 }from 'uuid'
export const createPost = async(req,res)=>{
    try {
        const file = req.file;
        const {language}  = req.body;
        const base64Image = new Buffer.from(file.buffer).toString("base64");
        const caption = await generateCaption(base64Image,language);
        const result = await uploadFile(file.buffer,`${uuid4()}`);
        
        const post  = await Post.create({
            caption:result.caption,
            imageUrl:result.url,
            user:req.user._id
        });

        await post.save();

        res.status(201).json({
            message:"created post successfully!",
            success:true,
            post:post
        });

    } catch (error) {
        console.log("Create Post Error : ",error);
        res.status(500).josn({
            message:"Internal server error",
            success:false
        })
    }
}

