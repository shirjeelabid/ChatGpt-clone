import React from "react";
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ sender, text, isLast }) => {
  return (
    <div className={`message ${sender}`}>
      <ReactMarkdown>{text}</ReactMarkdown>
      {isLast && (
        <div className="message-time">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;