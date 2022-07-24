// core modules
const path = require("path");
const http = require("http");
// library
const express = require("express");
const socket = require("socket.io");

const app = express();
const publicUrl = path.join(__dirname + `/../public`);
console.log(publicUrl);
app.use(express.static(publicUrl));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running port :${port}`);
});
