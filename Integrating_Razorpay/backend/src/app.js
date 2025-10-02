import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.route.js';
import paymentRoute from './routes/payment.routes.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors())
app.use("/api/product",productRoutes);
app.use("/api/payment",paymentRoute);
export default app;