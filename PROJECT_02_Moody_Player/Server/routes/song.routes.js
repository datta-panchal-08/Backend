import express from 'express';
import { uploadSong } from '../controllers/song.controllers.js';
import multer from 'multer';
const router = express.Router();

const upload = multer({storage:multer.memoryStorage()})

router.post("/songs",upload.single("audio"),uploadSong)

export default router;