import React, { useEffect, useState } from "react";
import BuyButton from "./BuyButton";

export default function BuyAmount({ coinCost, coinName }) {
  const [totalCost, setTotalCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
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
            coinCost={coinCost}
            coinName={coinName}
            coinAmount={quantity}
          />
          {/* <button onClick={buyCoin}>Buy</button> */}
        </div>
      </td>
      <td>${totalCost}</td>
    </>
  );
}
