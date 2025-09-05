import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const App = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const sendMessage = () => {
    if (inputMessage.trim() !== "" && socket) {
      // pehle local messages me add karo (user ka msg)
      setMessages((prev) => [...prev, { sender: "user", text: inputMessage }]);

      // loader true kar do (jab tak AI ka response aata hai)
      setLoading(true);

      // backend ko bhejo
      socket.emit("ai-message", inputMessage);

      // input clear
      setInputMessage("");
    }
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    // AI ke response ko listen karo
    socketInstance.on("ai-message-response", (data) => {
      setMessages((prev) => [...prev, { sender: "ai", text: data.response }]);
      setLoading(false); // response aane ke baad loader hatao
    });

    // cleanup
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <div className='flex flex-col py-4 items-center justify-between h-screen max-w-screen'>
      <div className="w-[30%] pb-3 h-[90vh] relative overflow-hidden border border-gray-400 rounded-md">

        {/* Header */}
        <div className="header sticky top-0 w-full py-5 text-center text-2xl font-bold bg-gradient-to-r from-pink-500 to-sky-400">
          Chat Interface
        </div>

        {/* Chat Body */}
        <div className="px-2 h-[80vh] flex flex-col">

          {/* Messages */}
          <div className="flex-1 px-3 pb-10 overflow-y-auto space-y-2">
            {messages.length === 0 ? (
              <div className='bg-gray-300 w-fit px-3 py-4 font-semibold rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md'>
                How Can I assist you today ?
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`w-fit text-sm px-3 py-4 font-semibold rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}

            {/* Loader */}
            {loading && (
              <div className="bg-gray-200 w-fit px-3 py-2 text-sm italic text-gray-500 rounded-md">
                Thinking...
              </div>
            )}
          </div>

          {/* Input Box (Sticky) */}
          <div className="inputbox sticky bottom-0 flex w-full items-center gap-2 justify-between px-2 py-3 bg-white">
            <input
              onChange={(e) => setInputMessage(e.target.value)}
              value={inputMessage}
              className='py-2 border border-gray-300 outline-none px-3 w-[78%] rounded-full'
              type="text"
              placeholder='Write message...'
              onKeyDown={(e) => e.key === "Enter" && sendMessage()} // enter press par bhi send
            />
            <button
              onClick={sendMessage}
              type='button'
              className='bg-gradient-to-r from-zinc-500 to-sky-400 w-[20%] py-2 font-semibold cursor-pointer ml-1 rounded-full'
            >
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
