import CryptoModel from "../models/Crypto";

const UserModel = require("../models/Users");

export const GetAllUsers = (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.state(500).json(err);
    } else {
      res.state(200).json(result);
    }
  });
};

export const CreateNewUser = async (req, res) => {
  const user = req.body;
  console.log(user);
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
};

export const SignInGoogle = async (req, res) => {
  UserModel.findOne({ email: req.body.email }, (error, result) => {
    if (error) {
      res.status(500).json(result);
    } else {
      if (result) {
        res.status(200).json(result);
      } else {
        const newUser = new UserModel(req.body).save();
        res.status(200).json(newUser);
      }
    }
  });
};

export const GetBalance = async (req, res) => {
  try {
    const email = req.params.email;
    const data = await UserModel.findOne({ email });
    res.status(200).json(data.balance);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const Deposit = async (req, res) => {
  try {
    const email = req.params.email;

    const user = await UserModel.findOne({ email });
    user.balance += Number(req.params.amount);
    await user.save();
    res.status(200).json(user.balance);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const Withdraw = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserModel.findOne({ email });
    user.balance -= Number(req.params.amount);
    await user.save();
    res.status(200).json(user.balance);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const GetUserWallet = async (req, res) => {
  try {
    const email = req.query.email;
    const data = await UserModel.findOne({ email });
    res.status(200).json(data.wallet);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//incomplete
export const GetNetworth = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserModel.findOne({ email });
    console.log(user.wallet);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const SellCoin = async (req, res) => {
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
      res.status(200).json(user.balance);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const BuyCoin = async (req, res) => {
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
    } else {
      const newCoin = new CryptoModel(req.body);
      user.wallet.push(newCoin);
      user.balance -= cost;
      await user.save();
    }
    res.status(200).json(user.balance);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
