import React from "react";
import ChatMessage from "./ChatMessage";

const ChatBox = ({ messages }) => {
  return (
    <div className="chat-box">
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
};

export default ChatBox;
