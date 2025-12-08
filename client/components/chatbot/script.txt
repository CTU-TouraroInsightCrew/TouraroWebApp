window.onload = function () {
  addBotMessage("Xin chào! 👋");
  addBotMessage("Tôi có thể giúp gì cho bạn hôm nay?");
  document.getElementById("suggestions").style.display = "block"; // hiện gợi ý ban đầu
};

document.getElementById("question").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
async function sendToBackend(question) {
  addLoading();

  const response = await fetch("http://localhost:4000/chat/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  const data = await response.json();

  removeLoading();
  addBotMessage(data.answer);
}


function sendSuggestion(text) {
  document.getElementById("suggestions").style.display = "none"; 
  addUserMessage(text);
  sendToBackend(text);
}

// function scrollMessages() {
//   const messages = document.getElementById("messages");
//   messages.scrollTop = messages.scrollHeight;
// }

function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "bubble user";
  div.textContent = text;
  document.getElementById("messages").appendChild(div);
  scrollMessages();
}

function addBotMessage(text) {
  const div = document.createElement("div");
  div.className = "bubble bot";

  text = text
    .replace(/\*\*(.*?)\*\*/g, "$1")      // bỏ bold markdown
    .replace(/- /g, "• ")                 // dấu bullet
    .replace(/\d+\./g, o => "\n" + o)      // danh sách 1. 2. 3. xuống dòng
    .replace(/\n{2,}/g, "\n")              // bỏ xuống dòng thừa
    .trim();

  div.textContent = text;
  document.getElementById("messages").appendChild(div);
  // scrollMessages();
}

function addLoading() {
  const div = document.createElement("div");
  div.className = "bubble bot";
  div.id = "loading-bubble";
  div.innerHTML = `<div class="spinner"></div>`;
  document.getElementById("messages").appendChild(div);
  // scrollMessages();
}

function removeLoading() {
  const el = document.getElementById("loading-bubble");
  if (el) el.remove();
}


async function sendMessage() {
  const input = document.getElementById("question");
  const question = input.value.trim();
  if (!question) return;

  // Ẩn gợi ý khi người dùng gửi tin đầu tiên
  const sug = document.getElementById("suggestions");
  if (sug && sug.style.display !== "none") {
    sug.style.display = "none";
  }


  addUserMessage(question);
  input.value = "";

  // Gửi chung về backend
  sendToBackend(question);
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const toggleBtn = document.getElementById("toggle-sidebar");

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");

  // Ẩn toggle khi sidebar đang mở
  if (sidebar.classList.contains("active")) {
    toggleBtn.classList.add("toggle-hidden");
  } else {
    toggleBtn.classList.remove("toggle-hidden");
  }
}
