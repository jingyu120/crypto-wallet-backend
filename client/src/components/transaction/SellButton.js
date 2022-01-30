import React, { useContext, useState } from "react";
import axios from "axios";
import { CryptoContext } from "../../services/cryptoContext";
import { AuthContext } from "../../services/authContext";
import { BalanceContext } from "../../services/balanceContext";
function SellButton({ coinProp, coinAmount }) {
  const { cryptoId } = useContext(CryptoContext);
  const { currentUser } = useContext(AuthContext);
  const { setBalance } = useContext(BalanceContext);
  const [processing, setProcessing] = useState(false);

  let coinPrice = null;
  const sellCoin = () => {
    if (coinAmount > coinProp.coinTotal) {
      alert("Not enough coins in wallet.");
    } else {
      try {
        setProcessing(true);
        axios
          .get(
            `https://api.coinlore.net/api/ticker/?id=${
              cryptoId[coinProp.coinSelected]
            }`
          )
          .then((res) => {
            coinPrice = res.data[0].price_usd;
          })
          .then(() => {
            const data = {
              name: coinProp.coinSelected,
              amount: Number(coinAmount),
              cost: Number(coinAmount * coinPrice),
            };
            axios
              .post(`http://localhost:3001/${currentUser.email}/sellCoin`, data)
              .then((res) => setBalance(res.data));
            setProcessing(false);
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  if (!processing) {
    return <button onClick={sellCoin}>Sell</button>;
  } else {
    return <>Processing</>;
  }
}

export default SellButton;
