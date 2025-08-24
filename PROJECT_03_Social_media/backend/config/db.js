import mongoose from 'mongoose';

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Conneted To DB successfully!");
    } catch (error) {
        console.log("DB Error : ",error);
    }
}