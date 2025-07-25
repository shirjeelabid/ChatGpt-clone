import React, { useState, useRef, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import axios from "axios";
import { API_BASE_URL } from "./config";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const handleSend = async (userMessage) => {
    const userMsg = { sender: "user", text: userMessage };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

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
        { sender: "gemini", text: "❌ Error: Could not reach Gemini API." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-box" ref={chatRef}>
        <ChatBox messages={messages} />
        {loading && <div className="typing">Gemini is typing...</div>}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default App;
