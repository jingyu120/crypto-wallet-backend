import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../Firebase";

export default function BuyAmount({ coinCost, coinName }) {
  const [totalCost, setTotalCost] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const buyCoin = () => {
    const data = {
      email: auth.currentUser.email,
      name: coinName,
      amount: Number(quantity),
      cost: Number(totalCost),
    };
    console.log(data);
    axios.post("http://localhost:3001/addCoin", data);
  };
  useEffect(() => {
    setTotalCost(quantity * coinCost);
  }, [coinCost, quantity]);

  return (
    <>
      <td>
        <div className="amount-container">
          <input
            placeholder="amount"
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
          />
          <button onClick={buyCoin}>Buy</button>
        </div>
      </td>
      <td>${totalCost}</td>
    </>
  );
}
