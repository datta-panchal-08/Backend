import { userModel } from "../models/user.model.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { fullName: { firstName, lastName }, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: "all fields are required",
                success: false
            })
        }

        // finding if a user already exitst in database
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "email is already registerd",
                success: false
            })
        }

        // if no user present with the email then create a new user 
        // but before that we have to hash the password by using bcrypt.hash

        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user with the details
        const user = await userModel.create({
            fullName: { firstName, lastName },
            email,
            password: hashedPassword
        });


        // generating token using jwt
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.cookie("token", token);

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: "Signup Successfull!",
            user: userResponse,
            success: true
        });

    } catch (error) {
        console.log("Signup  Error : ",error)
        res.status(500).json({
            message: `Something went wrong`,
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "email and password is required",
                success: false
            })
        }

        // checking if user is existis in db
        const isUserExists = await userModel.findOne({ email });

        if (!isUserExists) {
            return res.status(404).json({
                message: "user not found",
                success: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, isUserExists.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "invalid email or password",
                success: false
            })
        }

        const token = jwt.sign({ id: isUserExists._id }, process.env.JWT_SECRET);

        res.cookie("token", token);

        const userResponse = isUserExists.toObject();
        delete userResponse.password;

        res.status(200).json({
            message: "Login Successfull!",
            success: true,
            user: userResponse
        })

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}

export const logout = async(req,res) => {
   try {
      res.clearCookie("token");
      res.status(200).json({
        message:"Logout Successfull!",
        success:true
      })
   } catch (error) {
       res.status(500).json({
            message: "Something went wrong",
            success: false
        })
   }
}