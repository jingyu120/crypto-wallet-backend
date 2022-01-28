import React, { useEffect, useState } from "react";
import BuyButton from "./BuyButton";

export default function BuyAmount({ coinCost, coinName }) {
  const [totalCost, setTotalCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [buyFinish, setBuyFinish] = useState(false);
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
          <BuyButton
            coinName={coinName}
            coinAmount={quantity}
            setBuyFinish={setBuyFinish}
          />
        </div>
      </td>
      <td>${totalCost}</td>
    </>
  );
}
