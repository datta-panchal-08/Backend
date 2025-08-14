import { Song } from "../models/song.model.js";
import { uploadFile } from "../services/storage.service.js";

export const uploadSong = async (req, res) => {
  try {
    const { title, artist, mood } = req.body;
    const file = req.file;
    const fileData = await uploadFile(file);

    const newSong = await Song.create({
      title, artist, mood, audio: fileData.url
    });

    await newSong.save();

    res.status(201).json({
      message: "Song Created Successfully!",
      success: true,
      song: newSong
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error!",
      success: false
    });
  }
}

export const getSongsByMood = async (req, res) => {
  try {
    const { mood } = req.query;

    if (!mood) {
      return res.status(400).json({
        message: "Mood is required!",
        success: false
      });
    }

    const songs = await Song.find({ mood: mood });

    if (songs.length === 0) {
      return res.status(404).json({
        message: `No songs found for ${mood}`,
        success: false
      });
    }

    res.status(200).json({
      message: `Found songs for ${mood}`,
      success: true,
      songs
    });

  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};
