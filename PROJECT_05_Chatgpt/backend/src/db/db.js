import mongoose from 'mongoose';

export const connectDB = async()=>{
    try {
        mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("Connection Successfull!")}).catch((err)=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}

