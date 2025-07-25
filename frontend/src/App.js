import React, { useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import axios from "axios";
import { API_BASE_URL } from "./config";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (userMessage) => {
    const userMsg = { sender: "user", text: userMessage };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message: userMessage,
      });

      const geminiMsg = {
        sender: "gemini",
        text: response.data.response,
      };

      setMessages((prev) => [...prev, geminiMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "gemini", text: "Error: Could not reach Gemini API." },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <ChatBox messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default App;
