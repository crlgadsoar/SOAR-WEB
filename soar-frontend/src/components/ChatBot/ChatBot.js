import React, { useState } from "react";
import "./ChatBot.css";
import chatbotIcon from "../../assets/images/chatbot.png"; // Adjust the path as needed
import { predictFromChat } from "api/api";

const ChatBot = () => {
  console.log("ChatBot component is rendering"); // Debug log
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = input;
      setMessages([...messages, { text: userMessage, sender: "user" }]);
      setInput("");
  
      try {
        const data = (await predictFromChat(userMessage)).data;
        if (data) {
          const botReply = data.prediction; // Expected: string
          setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
        } else {
          setMessages((prev) => [...prev, { text: "Error: " + data.error, sender: "bot" }]);
        }
      } catch (err) {
        console.error(err);
        setMessages((prev) => [...prev, { text: "Something went wrong.", sender: "bot" }]);
      }
    }
  };
  

  return (
    <>
      {!isOpen && (
        <div className="chatbot-icon" onClick={toggleChat}>
          <img src={chatbotIcon} alt="Chatbot Icon" className="chatbot-icon-image" />
        </div>
      )}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span style={{ fontWeight: "bold" }}>Chat with AI</span>
            <button onClick={toggleChat}>✖</button>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="chatbot-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
