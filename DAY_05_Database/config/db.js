import mongoose from "mongoose";

export const connectDB = async(req,res)=>{
    try {
        await mongoose.connect("http://localhost:27017/notesDB");
        console.log("Connected Successfully");
    } catch (error) {
        console.log("Error While Connecting To DB");
    }
}