import React, { useContext, useState } from "react";
import axios from "axios";
import { CryptoContext } from "../../services/cryptoContext";
import { BalanceContext } from "../../services/balanceContext";
import { AuthContext } from "../../services/authContext";
import "./BuyButton.css";
function BuyButton({ coinProp, coinAmount }) {
  const { cryptoId } = useContext(CryptoContext);
  const { balance, setBalance } = useContext(BalanceContext);
  const { currentUser } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);

  let coinPrice = null;
  const buyCoin = () => {
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
          if (balance >= data.cost) {
            axios
              .post(`http://localhost:3001/api/user/${currentUser.email}/addCoin`, data)
              .then((res) => {
                setBalance(res.data);
              });
          } else {
            alert("not enough balance");
          }

          setProcessing(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!processing) {
    return (
      <button className="buy-button" onClick={buyCoin}>
        Buy
      </button>
    );
  } else {
    return <>Processing</>;
  }
}

export default BuyButton;
