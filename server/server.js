// core modules
const path = require("path");
const http = require("http");
// library
const express = require("express");
const socket = require("socket.io");

const generate = require("./utility/message");
const app = express();

const server = http.createServer(app);

let io = socket(server);
const publicUrl = path.join(__dirname + `/../public`);
console.log(publicUrl);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.emit("yaratilganUser", generate("Admin", "Welcome to Chat app"));

  socket.broadcast.emit(
    "yaratilganUser",
    generate("Admin", "The room joined new user")
  );

  socket.on("yangiUser", (message) => {
    console.log("sdvsd");
    console.log(message);

    io.emit("yaratilganUser", generate(message.from, message.text));
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
