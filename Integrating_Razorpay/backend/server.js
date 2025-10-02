import app from "./src/app.js";
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./src/db/db.js";

app.listen(3000,()=>{
    console.log(`Server is running on port 3000`);
});

connectDB();