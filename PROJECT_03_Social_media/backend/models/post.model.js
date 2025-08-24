import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    },
    caption:{
        type:String
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Like"
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

export const Post = mongoose.model("Post",postSchema);
