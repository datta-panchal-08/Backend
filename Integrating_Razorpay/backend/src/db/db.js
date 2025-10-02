import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = () =>{
    try {
        mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("Connection Succcessfull!");
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;
