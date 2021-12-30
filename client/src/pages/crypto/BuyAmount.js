import React, { useEffect, useState } from "react";

export default function BuyAmount({ coinCost }) {
  const [totalCost, setTotalCost] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const buyCoin = () => {
    setTotalCost(coinCost * quantity);
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
