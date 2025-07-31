import express from 'express';
import { Notes } from './models/notes.js';
import { connectDB } from './config/db.js';
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`)
});

app.get("/", (req, res) => {
    res.send("Hello, From Homepage!");
});

app.post("/notes", async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: "All Fileds Are Required",
            success: false
        })
    }

    const notes = await Notes.create({ title, content });
    await notes.save();

    return res.status(201).json({
        message: "Note Added!",
        success: true
    })
});

app.patch("/notes/:id", async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;

    const notes = await Notes.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
    }

    return res.status(201).json({
        message: "Note Updated!",
        success: true,
        notes
    })
});

app.delete("/notes/:id", async (req, res) => {
    const { id } = req.params;

  const deleteNote =  await Notes.findByIdAndDelete(id);
    if (!deleteNote) {
        return res.status(404).json({ message: 'Note not found' });
    }

    return res.status(201).json({
        message: "Note Deleted!",
        success: true,
    })
});

connectDB();
