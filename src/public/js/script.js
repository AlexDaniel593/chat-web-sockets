//crear sockets de comunicación
const socket = io(); //permite conectar,desconectar,reiniciar la conexión

const send = document.querySelector("#send-message");
const allMessage = document.querySelector("#all-messages");
const messageInput = document.querySelector("#message");

const sendMessage = () => {
  const message = messageInput.value;
  //Socket io es programacion orientada a eventos
  socket.emit("message", message);
  messageInput.value = "";
};

send.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

socket.on("message", ({ user, message, timestamp }) => {
  const date = new Date(timestamp);
  const dateFormat = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  
  const msg = document.createRange().createContextualFragment(
    `
      <div class="message incoming">
        <div class="image-container">
          <img src="/img/profile.jpg" alt="User Avatar" />
        </div>
        <div class="message-content">
          <div class="user-info">
            <span class="username">${user}</span>
            <span class="time">${dateFormat}</span>
          </div>
          <p>${message}</p>
        </div>
      </div>
    `,
  );
  allMessage.append(msg);
});
