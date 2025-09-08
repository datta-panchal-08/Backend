import dotenv from 'dotenv';
import {createServer} from 'http';
import app from "./src/app.js";
import { connectDB } from "./src/db/db.js";
import { initSocketServer } from './src/sockets/socket.server.js';
dotenv.config();

const httpServer = createServer(app);
initSocketServer(httpServer);

connectDB();

httpServer.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

