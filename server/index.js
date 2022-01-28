const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const CryptoModel = require("./models/Crypto");

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
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

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  console.log(user);
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.get("/getCoins", async (req, res) => {
  try {
    const email = req.query.email;
    const data = await UserModel.findOne({ email });
    res.json(data.wallet);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/addCoin", async (req, res) => {
  const { email, name, amount, cost } = req.body;
  delete req.body.email;

  try {
    const user = await UserModel.findOne({ email });
    const fetchedWallet = user.wallet.filter((u) => u.name === name);

    if (fetchedWallet.length > 0) {
      fetchedWallet.map((u) => {
        u.amount += amount;
        u.cost += cost;
      });
      await user.save();
      console.log("updated coin");
    } else {
      const newCoin = new CryptoModel(req.body);
      user.wallet.push(newCoin);
      await user.save();
      console.log("added new coin");
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/sellCoin", async (req, res) => {
  const { email, name, amount, cost } = req.body;
  delete req.body.email;

  try {
    const user = await UserModel.findOne({ email });
    const fetchedWallet = user.wallet.filter((u) => u.name === name);

    if (fetchedWallet.length > 0) {
      fetchedWallet.map((u) => {
        u.amount -= amount;
        u.cost -= cost;
      });
      await user.save();
      console.log("updated coin");
    }
  } catch (error) {
    console.log(error.message);
  }
});

async function run() {
  try {
    const userEmail = "jingyu120@gmail.com";
    const newCoin = new CryptoModel({ name: "LTC", amount: 1, cost: 500 });
    const user = await UserModel.findOne({ email: userEmail });

    console.log(user.wallet);
    user.wallet = [];

    await user.save();
    console.log(user.wallet);
  } catch (e) {
    console.log(e.message);
  }
}
// run();

server.listen(3001, () => {
  console.log("Server running");
});
