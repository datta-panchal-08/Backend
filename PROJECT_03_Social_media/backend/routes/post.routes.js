import express from 'express';
import multer, { memoryStorage } from 'multer';
import { createPost } from '../controllers/post.controller.js';
const router = express.Router();

// multer setup  
const upload = multer({storage:multer.memoryStorage()});

// Create Post API
router.post('/create',upload.single("image"),createPost)

export default router;