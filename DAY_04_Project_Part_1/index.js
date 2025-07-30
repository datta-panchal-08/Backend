import express from 'express';
const app = express();
const notes = [];

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome To Homepage!");
});

app.post("/create-notes",(req,res)=>{
   notes.push(req.body);
});

app.get("/notes",(req,res)=>{
    res.json(notes);
});

app.delete("/note/:index",(req,res)=>{
    const index = req.params.index;
    delete notes[index];
    res.json({
        message:"Note deleted successfullY!"
    })
});

app.patch("/note/:index",(req,res)=>{
    const index = req.params.index;
    const {title,description} = req.body;
    
    notes[index].title = title;
    notes[index].description = description;

    res.json({
        message:"Updated Successfully!"
    })
});

app.listen(3000,()=>{
    console.log("Server is running on port : 3000");
});
