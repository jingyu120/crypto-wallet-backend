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

const CryptoModel = mongoose.model("cryptos", CryptoSchema);

module.exports = CryptoModel;
