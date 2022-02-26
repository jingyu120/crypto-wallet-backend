const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cryptoRoutes = require("./routes/cryptoRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", cryptoRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://gracious-raman-429b5e.netlify.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

mongoose.connect(
  "mongodb+srv://jingyu120:Password123@cluster0.9w51a.mongodb.net/react-chat?retryWrites=true&w=majority"
);

server.listen(3001, () => {
  console.log("Server running");
});
