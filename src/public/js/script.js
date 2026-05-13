const socket = io();

// DOM Elements
const sendBtn = document.querySelector("#send-message");
const allMessages = document.querySelector("#all-messages");
const messageInput = document.querySelector("#message");

// State 
let typingTimer;
const DONE_TYPING_INTERVAL = 1500;

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return "Usuario";
};

const userCookie = getCookie("username");

// Helpers
const sendMessage = () => {
  const message = messageInput.value.trim();
  if (!message) return; // Evita enviar mensajes vacíos
  
  socket.emit("message", message);
  messageInput.value = "";
  socket.emit("stopTyping", userCookie);
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

// DOM Events
sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

messageInput.addEventListener("input", () => {
  socket.emit("typing", userCookie);
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    socket.emit("stopTyping", userCookie);
  }, DONE_TYPING_INTERVAL);
});

// Socket Events
socket.on("message", ({ user, avatar, message, timestamp }) => {
  const html = `
    <div class="message incoming">
      <div class="image-container">
        <img src="${avatar}" alt="User Avatar" />
      </div>
      <div class="message-content">
        <div class="user-info">
          <span class="username">${user}</span>
          <span class="time">${formatDate(timestamp)}</span>
        </div>
        <p>${message}</p>
      </div>
    </div>
  `;
  allMessages.insertAdjacentHTML("beforeend", html);
});

socket.on("typing", (username) => {
  if (!document.querySelector(`#typing-${username}`)) {
    const html = `<div id="typing-${username}" class="typing-indicator"><p><em>${username} está escribiendo...</em></p></div>`;
    allMessages.insertAdjacentHTML("beforeend", html);
  }
});

socket.on("stopTyping", (username) => {
  document.querySelector(`#typing-${username}`)?.remove();
});
