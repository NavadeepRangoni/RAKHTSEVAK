import React, { useState, useEffect } from "react";
import io from "socket.io-client";


const socket = io("http://localhost:5000"); // ✅ Adjust backend URL if needed

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleIncomingMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("message", handleIncomingMessage);

    return () => {
      socket.off("message", handleIncomingMessage); // ✅ Cleanup to avoid memory leaks
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessages((prev) => [...prev, `You: ${message}`]); // ✅ Display user's own message immediately
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h4 className="chat-header">Live Chat</h4>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <p key={index} className="chat-message">🗨️ {msg}</p>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="chat-send-btn">Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
