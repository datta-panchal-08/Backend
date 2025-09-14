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

            // Save the user's message in the database
            const userMessage = await messageModel.create({
               chat: messagePayload.chat,     // which chat this message belongs to
               user: socket.user._id,         // which user sent the message
               content: messagePayload.content, // actual message text
               role: "user"                   // role is "user"
            });

            // Generate vector (embedding) for the message text
            const vectors = await generateVectors(messagePayload?.content);

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

            // Try to find similar past memory (related messages)
            const memory = await queryMemory({
               queryVector: vectors,
               limit: 3,      // only return the closest 3 memory
               metadata: {
                  user:socket.user._id
               }
            })

            // Get the last 20 messages from this chat
            let stm = await messageModel.find({
               chat: messagePayload.chat
            })
               .sort({ createdAt: -1 })   // newest message first
               .limit(20)                 // only get last 20 messages
               .lean()                    // convert MongoDB docs into plain JS objects

            // Reverse so the order becomes oldest → newest
            stm = stm.reverse();

            const formatedStm = stm.map((item) => {
               return {
                  role: item.role,
                  parts:[{text:item.content}]
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
            const response = await generateAiResponse([...ltm, ...formatedStm]);

            // Save the AI's response in the database
            const aiMessageResponse = await messageModel.create({
               chat: messagePayload.chat,
               user: socket.user._id, // storing user ID (but this might be better as "system")
               content: response,
               role: "model"          // role is "model" because AI wrote it
            });

            // Generate vectors for the AI's response
            const responseVectors = await generateVectors(response);

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

            // Send the AI's response back to the client in real-time
            socket.emit("ai-response", {
               content: response,
               chat: messagePayload.chat
            });

         })

      })
   } catch (error) {
      // If something goes wrong during initialization, log it
      console.log("Socket Error : ", error);
   }
}
