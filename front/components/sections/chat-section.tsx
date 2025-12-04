"use client";

import { useEffect, useRef, useState } from "react";
import '../../app/chat/style.css';
interface Message {
  type: "user" | "bot" | "loading";
  text?: string;
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  // --- Helper functions (declare BEFORE useEffect that calls them) ---
function formatBotText(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")     // bỏ **bold**
    .replace(/- /g, "• ")                // bullet
    .replace(/(^|\n)(\d+\.\s)/g, "\n$2") // xuống dòng chỉ cho list "1. "
    .replace(/\n{2,}/g, "\n")            // không cho xuống dòng nhiều
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

  async function sendToBackend(question: string) {
    addLoading();
    try {
      const res = await fetch("http://localhost:4000/chat/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      removeLoading();
      // guard in case data.answer missing
      addBotMessage(typeof data?.answer === "string" ? data.answer : "Không có phản hồi");
    } catch (err) {
      removeLoading();
      addBotMessage("Có lỗi khi kết nối tới server.");
      console.error(err);
    }
  }

  function handleSend() {
    if (!input.trim()) return;
    setShowSuggestions(false);
    addUserMessage(input);
    sendToBackend(input);
    setInput("");
  }

  function sendSuggestion(text: string) {
    setShowSuggestions(false);
    addUserMessage(text);
    sendToBackend(text);
  }

  
// --- Scrolling ---
// const scrollToBottom = () => {
//   messagesRef.current?.scrollIntoView({ behavior: "smooth" });
// };

const firstLoad = useRef(true);

useEffect(() => {
  if (firstLoad.current) {
    firstLoad.current = false;
    return;        // ❗ Ngăn auto-scroll khi load trang
  }
  // scrollToBottom();
}, [messages]);
 
  // --- Greeting messages (now safe because addBotMessage is defined above) ---
  useEffect(() => {
    addBotMessage("Xin chào! 👋");
    addBotMessage("Tôi có thể giúp gì cho bạn hôm nay?");
  }, []);

  // --- JSX UI ---
  return (
    <div id="chat-container">
      <h3 className="header-frame">ChatBot Cần Thơ</h3>

      <div id="messages">
        {messages.map((msg, i) => (
          <div
            key={i}
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
        <div ref={messagesRef} />
      </div>

      {showSuggestions && (
        <div id="suggestions" style={{ marginBottom: "15px" }}>
          <button className="suggest-btn" onClick={() => sendSuggestion("Các địa điểm nổi bật ở Cần Thơ?")}>
            ✨ Các địa điểm nổi bật
          </button>
          <button className="suggest-btn" onClick={() => sendSuggestion("Gợi ý món ăn đặc sản Cần Thơ")}>
            🍜 Món ăn đặc sản
          </button>
          <button className="suggest-btn" onClick={() => sendSuggestion("Đi chợ nổi Cái Răng cần lưu ý gì?")}>
            ⛵ Đi chợ nổi
          </button>
        </div>
      )}

      <div id="input-area">
        <input
          id="question"
          placeholder="Nhập câu hỏi…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Gửi</button>
      </div>
    </div>
  );
}
