"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import "../chatbot_updated/style.css";// chỉnh lại path CSS cho đúng dự án

type MsgType = "user" | "bot" | "loading";

interface Message {
  type: MsgType;
  text?: string;
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // ===== Helpers =====
  /*function scrollMessages() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  } */

  function formatBotText(text: string) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1") // bỏ **bold**
      .replace(/- /g, "• ") // bullet
      .replace(/\d+\./g, (o) => "\n" + o) // xuống dòng trước 1. 2. 3.
      .replace(/\n{2,}/g, "\n") // bỏ xuống dòng thừa
      .trim();
  }

  

  function addBotMessage(text: string) {
    const cleaned = formatBotText(text);
    setMessages((prev) => [...prev, { type: "bot", text: cleaned }]);
  }

  function addUserMessage(text: string) {
    setMessages((prev) => [...prev, { type: "user", text }]);
  }

  function addLoading() {
    setMessages((prev) => [...prev, { type: "loading" }]);
  }

  function removeLoading() {
    setMessages((prev) => prev.filter((m) => m.type !== "loading"));
  }

  // ===== Gọi backend =====
  async function sendToBackend(question: string) {
    addLoading();

    try {
      const res = await fetch("http://localhost:4000/chat/api", {
        // nếu backend bạn là /api/chat thì sửa lại ở đây
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      removeLoading();
      addBotMessage(data.answer ?? "Không có phản hồi từ server.");
    } catch (err) {
      removeLoading();
      addBotMessage("Có lỗi khi kết nối tới server.");
      console.error(err);
    }
  }

  // ===== Khi click gợi ý =====
  function sendSuggestion(text: string) {
    setShowSuggestions(false);
    addUserMessage(text);
    sendToBackend(text);
  }

  // ===== Gửi tin nhắn =====
  function handleSend() {
    const question = input.trim();
    if (!question) return;

    if (showSuggestions) setShowSuggestions(false);

    addUserMessage(question);
    setInput("");
    sendToBackend(question);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  // ===== Sidebar =====
  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  function newChat() {
    // reset chat
    setMessages([]);
    setShowSuggestions(true);
    // gửi lại câu chào
    addBotMessage("Xin chào! 👋");
    addBotMessage("Tôi có thể giúp gì cho bạn hôm nay?");
  }

  // ===== Chào khi load component =====
  useEffect(() => {
    addBotMessage("Xin chào! 👋");
    addBotMessage("Tôi có thể giúp gì cho bạn hôm nay?");
  }, []);

  // Auto scroll khi có message mới
  /*useEffect(() => {
    scrollMessages();
  }, [messages]);*/

  // ===== JSX =====
  return (
    <div id="chat-section">
      {/* Overlay cho sidebar mobile */}
      <div
        id="sidebar-overlay"
        className={isSidebarOpen ? "active" : ""}
        onClick={toggleSidebar}
      />

      {/* SIDEBAR */}
      <div id="sidebar" className={isSidebarOpen ? "active" : ""}>
        <div className="sidebar-header">
          <button id="new-chat-btn" onClick={newChat}>
            + Cuộc trò chuyện mới
          </button>
          <h4>Lịch sử trò chuyện</h4>
        </div>

        <div id="chat-history">
          {/* TODO: hiển thị lịch sử nếu bạn có lưu */}
          <p style={{ color: "#aaa", fontSize: "0.9rem" }}>
            (Chưa có lịch sử – cần thêm logic lưu nếu muốn)
          </p>
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div id="chat-container">
        <div className="top-bar">
          <button
            id="toggle-sidebar"
            className={isSidebarOpen ? "toggle-hidden" : ""}
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <h3 className="header-frame">Chatbot Cần Thơ</h3>
        </div>

        <div id="messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={
                msg.type === "user"
                  ? "bubble user"
                  : msg.type === "bot"
                  ? "bubble bot"
                  : "bubble bot"
              }
            >
              {msg.type === "loading" ? <div className="spinner" /> : msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Gợi ý ban đầu */}
        {showSuggestions && (
          <div id="suggestions" style={{ marginBottom: "15px" }}>
            <button
              className="suggest-btn"
              onClick={() => sendSuggestion("Các địa điểm nổi bật ở Cần Thơ?")}
            >
              ✨ Các địa điểm nổi bật
            </button>
            <button
              className="suggest-btn"
              onClick={() => sendSuggestion("Gợi ý món ăn đặc sản Cần Thơ")}
            >
              🍜 Món ăn đặc sản
            </button>
            <button
              className="suggest-btn"
              onClick={() =>
                sendSuggestion("Đi chợ nổi Cái Răng cần lưu ý gì?")
              }
            >
              ⛵ Đi chợ nổi
            </button>
          </div>
        )}

        {/* Input */}
        <div id="input-area">
          <input
            type="text"
            id="question"
            placeholder="Nhập câu hỏi…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSend}>Gửi</button>
        </div>
      </div>
    </div>
  );
}
