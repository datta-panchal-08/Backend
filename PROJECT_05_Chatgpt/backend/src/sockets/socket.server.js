import { Server } from 'socket.io';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';
import generateAiResponse, { generateVectors } from '../services/ai.service.js';
import { messageModel } from '../models/message.model.js';
import { createMemory, queryMemory } from '../services/vector.service.js';

// This function will start the Socket.IO server
export function initSocketServer(httpServer) {
   try {
      // Create a new Socket.IO server and attach it to our HTTP server
      const io = new Server(httpServer);

      // Middleware: runs before a client is connected
      io.use(async (socket, next) => {
         // Parse cookies from the client's request
         const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

         // If no token is found in cookies, reject the connection
         if (!cookies.token) {
            return next(new Error("Authentication Error : No Token Provided"));
         }

         try {
            // Verify the JWT token using our secret key
            const decode = jwt.verify(cookies.token, process.env.JWT_SECRET);

            // Find the user in the database using the id inside the token
            const user = await userModel.findById(decode.id)

            // Attach the user object to the socket (so we know who is connected)
            socket.user = user;

            // Allow the connection to continue
            next();
         } catch (error) {
            // If token is invalid or verification fails, reject the connection
            next(new Error("Authentication Error : Invalid Token "));
         }

      });

      // Event: when a new client is connecte
      io.on("connection", (socket) => {

         // Listen for "ai-message" event from the client
         socket.on("ai-message", async (messagePayload) => {

            const [userMessage, vectors] = await Promise.all([
               // Save the user's message in the database
               messageModel.create({
                  chat: messagePayload.chat,     // which chat this message belongs to
                  user: socket.user._id,         // which user sent the message
                  content: messagePayload.content, // actual message text
                  role: "user"                   // role is "user"
               }),
               // Generate vector (embedding) for the message text
               generateVectors(messagePayload?.content),
            ])
            
             // Save this vector to memory store with extra details
            await createMemory({
               vectors,
               messageId: userMessage._id,
               metadata: {
                  chat: messagePayload.chat,
                  user: socket.user._id,
                  text: messagePayload.content
               }
            })

            const [memory, chatHistory] = await Promise.all([
               queryMemory({
                  queryVector: vectors,
                  limit: 3,
                  metadata: { user: socket.user._id }
               }),
               messageModel.find({
                  chat: messagePayload.chat
               })
                  .sort({ createdAt: -1 }) // newest first
                  .limit(20)
                  .lean()
            ]);

            // yaha pe reverse kar lo
            chatHistory.reverse(); // ab oldest → newest


            const stm = chatHistory.map((item) => {
               return {
                  role: item.role,
                  parts: [{ text: item.content }]
               }
            })

            const ltm = [
               {
                  role: "user",
                  parts: [
                     {
                        text: `these are some previous messages from the chat, use them to generate a response
                           ${memory.map((item) => item.metadata.text).join('\n')}
                        `
                     }
                  ]
               }
            ]

            // Ask the AI model to generate a response
            // We send the recent chat history in the correct format
            const response = await generateAiResponse([...ltm, ...stm]);

            // Send the AI's response back to the client in real-time
            socket.emit("ai-response", {
               content: response,
               chat: messagePayload.chat
            });

            const [aiMessageResponse, responseVectors] = await Promise.all([
               // Save the AI's response in the database
               messageModel.create({
                  chat: messagePayload.chat,
                  user: socket.user._id, // storing user ID (but this might be better as "system")
                  content: response,
                  role: "model"          // role is "model" because AI wrote it
               }),

               // Generate vectors for the AI's response
               generateVectors(response)
            ])

            // Save the AI response vector into memory
            await createMemory({
               vectors: responseVectors,
               messageId: aiMessageResponse._id,
               metadata: {
                  chat: messagePayload.chat,
                  user: socket.user._id,
                  text: response
               }
            })

         })

      })
   } catch (error) {
      // If something goes wrong during initialization, log it
      console.log("Socket Error : ", error);
   }
}
