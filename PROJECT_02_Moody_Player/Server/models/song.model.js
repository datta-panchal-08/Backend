import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title:String,
    artist:String,
    audio:String,
    mood:String
})

export const Song = mongoose.model("Song",songSchema);