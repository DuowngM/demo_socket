const express = require("express");
const { createServer } = require("node:http");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

io.on("connection", (socket) => {
  console.log("Connect thanh cong");
  // Sự kiện khi nhận được message từ client
  socket.on("message", (data) => {
    console.log("Text nhan tu React:", data);
    // Gửi tin nhắn trả lời cho client
    io.emit("message", "Text tu server!");
  });
  // Sự kiện khi client disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
