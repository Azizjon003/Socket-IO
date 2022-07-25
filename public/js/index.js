let socket = io();
console.log(socket);

const btn = document.querySelector("#submit");
const Input = document.querySelector("#message");
socket.on("connect", function (sockett) {
  console.log("connect usert");
});

socket.on("yaratilganUser", function (message) {
  console.log(message);
  const li = document.createElement("li");
  li.innerText = `${message.from}: ${message.text}`;

  document.querySelector("body").appendChild(li);
});
btn.addEventListener("click", function (e) {
  e.preventDefault();
  socket.emit("yangiUser", {
    from: "User",
    text: Input.value,
  });
});
