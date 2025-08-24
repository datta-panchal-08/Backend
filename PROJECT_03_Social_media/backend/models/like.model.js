import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});
export const Like = mongoose.model("Like",likeSchema);