import React, { useState } from "react";
import "./ChatBot.css";
import chatbotIcon from "../../assets/images/chatbot.png"; // Adjust the path as needed

const ChatBot = () => {
  console.log("ChatBot component is rendering"); // Debug log
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      // Simulate AI response
    //   const responses = [
    //     "This is an AI response.",
    //     "How can I assist you today?",
    //     "I'm here to help!",
    //     "Can you please elaborate?",
    //     "Let me think about that..."
    //   ];
      const responses = [
        "This seems to be a DOS attack. You may block IP.",
        "My intuition tells me this is a phishing attack. Alert the user.",
        "This could be a malware attack. Remove vulnerable software.",
        "Perhaps, This is a ransomware attack. Notify the team.",
        "This looks like a SQL injection attack. Update the DB privileges.",
        "This might be a XSS attack. Take necessary actions."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: randomResponse, sender: "bot" },
        ]);
      }, 1000);
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
