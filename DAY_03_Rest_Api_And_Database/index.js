import express from 'express';
const app = express();
let notes=[];

app.get('/home',(req,res)=>{
    res.send("Welcome to, Homepage!");
});

app.post("/create",async(req,res)=>{
    notes.push(req.body);
    res.json({
        message:"Note added successfully!",
        notes
    })
});

app.listen(3000,()=>{
    console.log(`server is run,ning on port => 3000`);
});

