import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All Fileds Are Required!",
                success: false
            })
        }

        // checking if the email is already exists in db
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists!",
                success: false
            })
        }

        // hashing the password before signup
        const hashedPassword = await bcrypt.hash(password, 10);

        // Signing up the user 
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        const userResponse = user.toObject();
        userResponse.password = null;
        res.status(201).json({
            message: "Signup successfull!",
            success: true,
            user: userResponse
        })

    } catch (error) {
        console.log("Signup Error : " + error);
        res.status(500).json({
            message: "Internal server error!",
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "All Fileds Are Required!",
                success: false
            })
        }

        // find user with username
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found!",
                success: false
            })
        }

        // if user found then compare paswords
        const comparePasswords = await bcrypt.compare(password, existingUser.password);
        if (!comparePasswords) {
            return res.status(401).json({
                message: "Invalid username or password",
                success: false
            })
        }
        const payload = {
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        })

        const userResponse = existingUser.toObject();
        userResponse.password = null;
        res.status(200).json({
            message: "Login Successfull!",
            success: true,
            user: userResponse
        });

    } catch (error) {
        console.log("Login Error : ", error);
        res.status(500).json({
            message: "Internal server error!",
            success: false
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
        })

        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.log("Logout Error : ", error);
        res.status(500).json({
            message: "Internal server error!",
            success: false
        })
    }
}
