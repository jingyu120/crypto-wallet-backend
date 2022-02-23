import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../services/authContext";
import { BalanceContext } from "../../services/balanceContext";
import "./Balance.css";
function Balance() {
  const [amount, setAmount] = useState(null);
  const [transaction, setTransaction] = useState("+");
  let { balance, setBalance } = useContext(BalanceContext);
  const { currentUser } = useContext(AuthContext);

  const postTransaction = (trsx) => {
    if (trsx === "+") {
      axios
        .post(
          `http://localhost:3001/api/user/${currentUser.email}/depositCash/${amount}`
        )
        .then((res) => {
          setBalance(res.data);
        });
    } else if (trsx === "-") {
      axios
        .post(
          `http://localhost:3001/api/user/${currentUser.email}/withdrawCash/${amount}`
        )
        .then((res) => {
          setBalance(res.data);
        });
    } else {
      alert("invalid transaction method.");
    }
  };
  const submitTransaction = () => {
    if (transaction === "+") {
      postTransaction("+");
    } else if (transaction === "-") {
      if (Number(amount) > balance) {
        alert("Not enough for a withdraw.");
      } else {
        postTransaction("-");
      }
    } else {
      alert("transaction is not + or -");
    }
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
