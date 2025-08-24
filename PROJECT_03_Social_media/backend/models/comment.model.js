import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});
export const Comment = mongoose.model("Comment",likeSchema);