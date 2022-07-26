// core modules
const path = require("path");
const http = require("http");
// library
const express = require("express");
const socket = require("socket.io");

const generate = require("./utility/message");
const string = require("./utility/string");
const User = require("./utility/user");

const app = express();

const server = http.createServer(app);
let io = socket(server);
const publicUrl = path.join(__dirname + `/../public`);
let users = new User();

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (obj, funct) => {
    console.log(obj.name);
    if (!string(obj.name) || !string(obj.room)) {
      console.log("error");
      funct("Name and room are required");
    }

    socket.join(obj.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, obj.name, obj.room);

    io.to(obj.room).emit("updateUsers", users.getUserList(obj.room));
    socket.emit(
      "yaratilganUser",
      generate("Admin", "Welcome to " + obj.room + " room")
    );

    socket.broadcast
      .to(obj.room)
      .emit(
        "yaratilganUser",
        generate("Admin", `The ${obj.room} room joined new user`)
      );

    funct();
  });
  socket.on("yangiUser", (message) => {
    console.log("sdvsd");
    console.log(message);
    let user = users.getUser(socket.id);
    if (user && string(message.text)) {
      io.to(user.room).emit(
        "yaratilganUser",
        generate(user.name, message.text)
      );
    }
  });
  socket.on("disconnect", () => {
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUsers", users.getUserList(user.room));
      io.to(user.room).emit(
        "yaratilganUser",
        generate("admin", `${user.name} left  the room is ${user.room}`)
      );
    }
  });
});

app.use(express.static(publicUrl));

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`server is running port :${port}`);
});
