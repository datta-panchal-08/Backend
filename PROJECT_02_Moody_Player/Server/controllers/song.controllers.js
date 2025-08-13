import { Song } from "../models/song.model.js";
import { uploadFile } from "../services/storage.service.js";

export const uploadSong = async(req,res)=>{
    try {
        const {title,artist,mood} = req.body;
        const file = req.file;
        const fileData = await uploadFile(file);
        console.log(fileData);
        res.status(201).json({
            message:"Song Created Successfully!",
        })

    } catch (error) {
        
    }
}