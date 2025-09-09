import { Server } from 'socket.io';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';
import generateAiResponse from '../services/ai.service.js';
import { messageModel } from '../models/message.model.js';

export function initSocketServer(httpServer) {
   try {
      const io = new Server(httpServer);
      io.use(async (socket, next) => {
         const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
         if (!cookies.token) {
            return next(new Error("Authentication Error : No Token Provided"));
         }

         try {
            const decode = jwt.verify(cookies.token, process.env.JWT_SECRET);
            const user = await userModel.findById(decode.id)
            socket.user = user;
            next();
         } catch (error) {
            next(new Error("Authentication Error : Invalid Token "));
         }

      });

      io.on("connection", (socket) => {

         socket.on("ai-message",async(messagePayload)=>{

              await messageModel.create({
               chat:messagePayload.chat,
               user:socket.user._id,
               content:messagePayload.content,
               role:"user"
            });
            
            const chatHistory = await messageModel.find({
               chat:messagePayload.chat
            });

            const response = await generateAiResponse(
               // Chat History For Ai Model
               chatHistory.map(item=>{
               return {
                  role:item.role,
                  parts:[{text:item.content}]
               }
            }));

              await messageModel.create({
               chat:messagePayload.chat,
               user:socket.user._id,
               content:response,
               role:"model"
            });
            
            socket.emit("ai-response",{
               content:response,
               chat:messagePayload.chat
            });

         
           
         })

      })
   } catch (error) {
      console.log("Socket Error : ", error);
   }
}