import express from 'express';
import { login, logout, signup } from '../controllers/user.controller.js';
const router = express.Router();

// Signup API
router.post('/signup',signup);
// Login API
router.post("/login",login);
// Logout API
router.post("/logout",logout)

export default router;