const router = require("express").Router();
import {
  CreateNewUser,
  GetAllUsers,
  SignInGoogle,
} from "../controllers/userController";
const UserModel = require("../models/Users");
const CryptoModel = require("../models/Crypto");

router.get("/getUsers", GetAllUsers);

router.post("/createUser", CreateNewUser);

router.post("/google_sign_in", SignInGoogle);

router.get("/:email/balance", async (req, res) => {
  try {
    const email = req.params.email;
    const data = await UserModel.findOne({ email });
    res.json(data.balance);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/:email/depositCash/:amount", async (req, res) => {
  try {
    const email = req.params.email;
    try {
      const user = await UserModel.findOne({ email });
      user.balance += Number(req.params.amount);
      user.save();
      res.json(user.balance);
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/:email/withdrawCash/:amount", async (req, res) => {
  try {
    const email = req.params.email;
    try {
      const user = await UserModel.findOne({ email });
      user.balance -= Number(req.params.amount);
      user.save();
      res.json(user.balance);
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/getCoins", async (req, res) => {
  try {
    const email = req.query.email;
    const data = await UserModel.findOne({ email });
    res.json(data.wallet);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:email/networth", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserModel.findOne({ email });
    console.log(user.wallet);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/:email/sellCoin", async (req, res) => {
  const { name, amount, cost } = req.body;
  const email = req.params.email;

  try {
    const user = await UserModel.findOne({ email });
    const fetchedWallet = user.wallet.filter((u) => u.name === name);

    if (fetchedWallet.length > 0) {
      fetchedWallet.map((u) => {
        u.amount -= amount;
        u.cost -= cost;
      });
      user.balance -= cost;
      await user.save();
      res.json(user.balance);
      console.log("updated coin");
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/:email/addCoin", async (req, res) => {
  const { name, amount, cost } = req.body;
  const email = req.params.email;
  try {
    const user = await UserModel.findOne({ email });
    const fetchedWallet = user.wallet.filter((u) => u.name === name);

    if (fetchedWallet.length > 0) {
      fetchedWallet.map((u) => {
        u.amount += amount;
        u.cost += cost;
      });
      user.balance -= cost;
      await user.save();
      console.log("updated coin");
    } else {
      const newCoin = new CryptoModel(req.body);
      user.wallet.push(newCoin);
      user.balance -= cost;
      await user.save();
      console.log("added new coin");
    }
    res.json(user.balance);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
