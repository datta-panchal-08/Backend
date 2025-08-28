import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import { isAuthenticated } from './middlewares/Auth.middleware.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3200;
const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true
}

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/post",isAuthenticated,postRoutes);

app.listen(PORT,()=>{
   console.log(`App is running on PORT : ${PORT}`);
})

//database connection
connectDB();


