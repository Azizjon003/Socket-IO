let socket = io();
console.log(socket);
socket.on("connect", function (sockett) {
  console.log("connect usert");
});

socket.on("yaratilganUser", function (message) {
  console.log(message);
});
