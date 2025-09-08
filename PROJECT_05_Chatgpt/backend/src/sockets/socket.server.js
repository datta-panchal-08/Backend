import {Server} from 'socket.io';


export function initSocketServer(httpServer){
     try {
        const io = new Server(httpServer);
        io.on("connection",(socket)=>{
            console.log("New socket connection ",socket.id);
        })
     } catch (error) {
        console.log("Socket Error : ",error);
     }
}