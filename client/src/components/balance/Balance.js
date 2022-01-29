import React, { useState } from "react";
import "./Balance.css";
function Balance() {
  const [amount, setAmount] = useState(null);
  const [transaction, setTransaction] = useState("+");

  const submitTransaction = () => {
    console.log(amount, transaction);
  };
  return (
    <div className="balance_input">
      <label>Amount</label>
      <input
        placeholder="Amount in USD"
        onChange={(event) => setAmount(event.target.value)}
      ></input>
      <select
        value={transaction}
        onChange={(event) => setTransaction(event.target.value)}
      >
        <option value="+">Deposit</option>
        <option value="-">Withdraw</option>
      </select>
      <button onClick={submitTransaction}>Submit</button>
    </div>
  );
}

export default Balance;
