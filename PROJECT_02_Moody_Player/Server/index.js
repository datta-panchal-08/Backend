import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

// Route Imports
import songRoutes from './routes/song.routes.js';

import { connectDB } from './config/db.js';
import router from './routes/song.routes.js';
const app = express();
app.use(express.json());
app.use(cors());

app.use("/",songRoutes);

app.listen(3000,()=>{
  console.log("Server is running on port: 3000")
});

connectDB();