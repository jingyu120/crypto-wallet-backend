const mongoose = require("mongoose");

const CryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  wallet: [CryptoSchema],
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
