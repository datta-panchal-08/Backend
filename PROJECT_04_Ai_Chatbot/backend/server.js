import dotenv from 'dotenv';
import generateResponse from './src/service/ai.service.js';
import app from './src/app.js';
import {createServer} from 'http';
import { Server } from 'socket.io';

dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors: {
    origin: "http://localhost:5173", 
  }});

const chatHistory = [];

io.on("connection",(socket)=>{
    console.log("A User Connected...");

    socket.on("disconnect",()=>{
        console.log("User is disconnected...");
    });

    socket.on("ai-message",async(data)=>{
        console.log("Recieved Prompt : ",data);
        chatHistory.push({
            role:"user",
            parts:[{text:data}]
        });
        const response = await generateResponse(chatHistory);
        console.log("Ai response : ",response);
        chatHistory.push({
            role:"model",
            parts:[{text:response}]
        })   
        socket.emit("ai-message-response",{response});
    })

});

httpServer.listen(3000,()=>{
    console.log(`Server is running on port 3000`);
});

