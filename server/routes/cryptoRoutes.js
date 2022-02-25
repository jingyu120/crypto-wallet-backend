const router = require("express").Router();
import {
  CreateNewUser,
  GetAllUsers,
  SignInGoogle,
  GetBalance,
  Deposit,
  Withdraw,
  GetUserWallet,
  GetNetworth,
  SellCoin,
  BuyCoin,
} from "../controllers/userController";
const UserModel = require("../models/Users");
const CryptoModel = require("../models/Crypto");

router.get("/getUsers", GetAllUsers);

router.post("/createUser", CreateNewUser);

router.post("/google_sign_in", SignInGoogle);

router.get("/:email/balance", GetBalance);

router.post("/:email/depositCash/:amount", Deposit);

router.post("/:email/withdrawCash/:amount", Withdraw);

router.get("/getCoins", GetUserWallet);

router.get("/:email/networth", GetNetworth);

router.post("/:email/sellCoin", SellCoin);

router.post("/:email/addCoin", BuyCoin);

module.exports = router;
