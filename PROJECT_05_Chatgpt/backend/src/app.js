import express from 'express';
import cookieParser from 'cookie-parser';

//route imports
import authRoutes from './routes/auth.routes.js';
import chatRoutes from './routes/chat.routes.js';

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// route endpoints
app.use("/api/auth",authRoutes);
app.use('/api/chat',chatRoutes);


export default app;
