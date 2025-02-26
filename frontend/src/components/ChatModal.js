import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import "./ChatModal.css";

const ChatModal = ({ selectedAdmin, onClose, socketRef }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef();

  // Fetch chat history when component mounts or admin changes
  useEffect(() => {
    if (selectedAdmin && socketRef.current?.connected) {
      const userId = JSON.parse(atob(Cookies.get("userToken").split(".")[1])).id;
      
      // Set up listener for chat history
      socketRef.current.off("chatHistory");
      socketRef.current.on("chatHistory", (history) => {
        console.log("Chat history received:", history);
        setMessages(history);
      });
      
      // Request chat history
      socketRef.current.emit(
        "fetchChatHistory",
        {
          userId,
          adminId: selectedAdmin._id,
        },
        (response) => {
          if (response?.error) {
            console.error("Error fetching chat history:", response.error);
          }
        }
      );

      // Listen for new incoming messages
      socketRef.current.off("receiveMessage");
      socketRef.current.on("receiveMessage", (message) => {
        setMessages((prev) => [...prev, message]);
      });
    }
    
    // Cleanup listeners when component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.off("chatHistory");
        socketRef.current.off("receiveMessage");
      }
    };
  }, [selectedAdmin, socketRef]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !socketRef.current?.connected) return;

    const userId = JSON.parse(atob(Cookies.get("userToken").split(".")[1])).id;
    const timestamp = new Date();
    const messageId = `local-${Date.now()}`;

    const newMsg = {
      _id: messageId, // Temporary local ID
      message: newMessage,
      sender: "user",
      timestamp: timestamp,
      userId,
      adminId: selectedAdmin._id,
      status: "sending", // Add status indicator
    };

    setMessages((prev) => [...prev, newMsg]);

    socketRef.current.emit(
      "sendMessage",
      {
        senderId: userId,
        receiverId: selectedAdmin._id,
        message: newMessage,
        senderType: "user",
      },
      (acknowledgment) => {
        if (acknowledgment?.success) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg._id === messageId ? { ...msg, status: "delivered" } : msg
            )
          );
        } else {
          console.error("Message delivery failed:", acknowledgment?.error);
        }
      }
    );

    setNewMessage("");
  };

  return (
    <div className="chat-modal">
      <div className="chat-container">
        <div className="chat-header">
          <h3>Chat with {selectedAdmin.name}</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`message ${msg.sender === "user" ? "sent" : "received"}`}
            >
              <div className="message-content">
                <p>{msg.message}</p>
                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                  {msg.status === "sending" && " ⌛"}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
