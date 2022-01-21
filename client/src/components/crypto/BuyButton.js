import React from "react";
import { auth } from "../../authentication/Firebase";
import axios from "axios";
function BuyButton({ coinName, coinCost, coinAmount }) {
  const buyCoin = () => {
    const data = {
      email: auth.currentUser.email,
      name: coinName,
      amount: Number(coinAmount),
      cost: Number(coinAmount * coinCost),
    };
    axios.post("http://localhost:3001/addCoin", data);
  };
  return <button onClick={buyCoin}>Buy</button>;
}

export default BuyButton;
