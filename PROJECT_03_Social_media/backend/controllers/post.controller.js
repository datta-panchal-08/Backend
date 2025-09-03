import { Post } from "../models/post.model.js";
import { generateCaption } from "../service/ai.service.js";
import { uploadFile } from "../service/storage.service.js";
import {v4 as uuid4 }from 'uuid'
import crypto from 'crypto';

const hashImageBuffer = (buffer) => {
    return crypto.createHash("sha256").update(buffer).digest("hex");
};

export const createPost = async (req, res) => {
    try {
        const file = req.file;
        const { language } = req.body;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image file is required"
            });
        }

        const imageHash = hashImageBuffer(file.buffer);

        // Check if post with same image already exists
        const existingPost = await Post.findOne({ imageHash, user: req.user._id });

        if (existingPost) {
            const caption = await generateCaption(existingPost.imageUrl, language);

            existingPost.caption = caption;
            await existingPost.save();

            return res.status(200).json({
                message: "Caption updated for existing post!",
                success: true,
                post: existingPost
            });
        }

        const base64Image = Buffer.from(file.buffer).toString("base64");
        const caption = await generateCaption(base64Image, language);

        const result = await uploadFile(file.buffer, `${uuid4()}`);

        const newPost = await Post.create({
            caption,
            imageUrl: result.url,
            imageHash,
            user: req.user._id
        });

        res.status(201).json({
            message: "Created post successfully!",
            success: true,
            post: newPost
        });

    } catch (error) {
        console.error("Create Post Error:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

