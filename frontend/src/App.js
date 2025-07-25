import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiPlus } from "react-icons/fi";
import { RiRobot2Line, RiUser3Line } from "react-icons/ri";
import axios from "axios";
import { API_BASE_URL } from "./config";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSend = async () => {
    if (input.trim() === "" || loading) return;
    
    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message: input,
      });

      const aiMessage = {
        sender: "ai",
        text: response.data.response,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarVisible ? "sidebar-visible" : ""}`}>
        <div className="sidebar-header" onClick={() => setMessages([])}>
          <FiPlus className="new-chat-icon" />
          <span>New chat</span>
        </div>
        <div className="sidebar-history">
          {/* History items would go here */}
        </div>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">U</div>
            <span>User</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Chat container */}
        <div className="chat-container" ref={chatContainerRef}>
          {messages.length === 0 ? (
            <div className="welcome-container">
              <h1 className="welcome-title">ChatGPT</h1>
              <div className="suggestion-container">
                <div className="suggestion-card">
                  <div className="suggestion-title">Explain quantum computing</div>
                  <div className="suggestion-desc">in simple terms</div>
                </div>
                <div className="suggestion-card">
                  <div className="suggestion-title">Got any creative ideas</div>
                  <div className="suggestion-desc">for a 10 year old's birthday?</div>
                </div>
                <div className="suggestion-card">
                  <div className="suggestion-title">How do I make an HTTP request</div>
                  <div className="suggestion-desc">in JavaScript?</div>
                </div>
                <div className="suggestion-card">
                  <div className="suggestion-title">Write a poem</div>
                  <div className="suggestion-desc">about artificial intelligence</div>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === "user" ? "user-message" : "ai-message"}`}
              >
                <div className={`message-avatar ${message.sender === "user" ? "user-avatar" : "ai-avatar"}`}>
                  {message.sender === "user" ? <RiUser3Line /> : <RiRobot2Line />}
                </div>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="message ai-message">
              <div className="message-avatar ai-avatar">
                <RiRobot2Line />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="input-container">
          <div className="input-area">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message ChatGPT..."
              rows={1}
            />
            <button
              className="send-button"
              onClick={handleSend}
              disabled={input.trim() === "" || loading}
            >
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;