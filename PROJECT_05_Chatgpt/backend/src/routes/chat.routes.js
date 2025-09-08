import express from 'express';
import { createChat } from '../controllers/chat.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/",isAuthenticated,createChat);

export default router;
