import React from "react";
import ChatMessage from "./ChatMessage";

const ChatBox = ({ messages, loading }) => {
  return (
    <div className="chat-box">
      {messages.length === 0 && (
        <div className="welcome-message">
          <h3>Welcome to Gemini Chat</h3>
          <p>Ask me anything and I'll do my best to help!</p>
        </div>
      )}
      {messages.map((msg, idx) => (
        <ChatMessage 
          key={idx} 
          sender={msg.sender} 
          text={msg.text} 
          isLast={idx === messages.length - 1}
        />
      ))}
      {loading && (
        <div className="typing">
          <span>Gemini is typing</span>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;