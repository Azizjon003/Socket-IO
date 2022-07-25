// core modules
const path = require("path");
const http = require("http");
// library
const express = require("express");
const socket = require("socket.io");

const app = express();

const server = http.createServer(app);

let io = socket(server);
const publicUrl = path.join(__dirname + `/../public`);
console.log(publicUrl);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.emit("yaratilganUser", {
    name: "Admin",
    text: "Welcome to room new User",
    createdAt: new Date().getTime(),
  });

  socket.broadcast.emit("yaratilganUser", {
    name: "Admin",
    text: "Room is joined new User",
    createdAt: new Date().getTime(),
  });

  socket.on("yangiUser", (message) => {
    console.log("sdvsd");
    console.log(message);

    io.emit("yaratilganUser", {
      name: message.name,
      text: message.text,
      createdAt: message.createdAt,
    });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(express.static(publicUrl));

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`server is running port :${port}`);
});
