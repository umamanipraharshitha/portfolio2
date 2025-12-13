import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaRobot, FaPaperPlane, FaArrowDown } from "react-icons/fa";
import "./Chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [attention, setAttention] = useState(false);

  const messagesRef = useRef(null);
  const endRef = useRef(null);

  /* Scroll to bottom */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* Scroll detector */
  const handleScroll = () => {
    const el = messagesRef.current;
    if (!el) return;
    const nearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 30;
    setShowScrollDown(!nearBottom);
  };

  /* Attention pulse every 40s */
  useEffect(() => {
    if (open) return;
    const interval = setInterval(() => {
      setAttention(true);
      setTimeout(() => setAttention(false), 2500);
    }, 40000);
    return () => clearInterval(interval);
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("https://mpraharshitha.onrender.com/api/assistant", {
        question: input,
      });
      setMessages((p) => [...p, { sender: "bot", text: res.data.answer }]);
    } catch {
      setMessages((p) => [
        ...p,
        { sender: "bot", text: "Unable to reach AI assistant." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating button */}
      {!open && (
        <div
          className={`chatbot-button ${attention ? "attention" : ""}`}
          onClick={() => setOpen(true)}
        >
          <FaRobot size={22} />
        </div>
      )}

      {/* Chatbox */}
      {open && (
        <div className="chatbot-box">
          <div className="chat-header">
            <div className="avatar">
              <FaRobot />
            </div>
            <div className="title">
              <span>AI Assistant</span>
              <small>Online • Ready to help</small>
            </div>
            {/* Close/minimize arrow */}
            <div
              className="close-chat"
              onClick={() => setOpen(false)}
              style={{ marginLeft: "auto", cursor: "pointer" }}
            >
              <FaArrowDown color="#00eaff" />
            </div>
          </div>

          <div
            className="messages"
            ref={messagesRef}
            onScroll={handleScroll}
          >
            {messages.map((m, i) => (
              <div key={i} className={`message-wrapper ${m.sender}`}>
                {m.sender === "bot" && (
                  <div className="message-avatar">
                    <FaRobot />
                  </div>
                )}
                <div className={`message ${m.sender}`}>{m.text}</div>
              </div>
            ))}

            {loading && (
              <div className="message-wrapper bot">
                <div className="message-avatar">
                  <FaRobot />
                </div>
                <div className="message bot loading">Thinking...</div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {showScrollDown && (
            <div
              className="scroll-down"
              onClick={() =>
                endRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <FaArrowDown /> Keep down
            </div>
          )}

          <div className="input-area">
            <input
              value={input}
              placeholder="Ask me anything..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
