import React, { useContext, useState } from "react";
import { auth } from "../../authentication/Firebase";
import axios from "axios";
import { CryptoContext } from "../../services/cryptoContext";
function BuyButton({ coinProp, coinAmount }) {
  const { cryptoId } = useContext(CryptoContext);
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
            email: auth.currentUser.email,
            name: coinProp.coinSelected,
            amount: Number(coinAmount),
            cost: Number(coinAmount * coinPrice),
          };
          axios.post("http://localhost:3001/addCoin", data);
          setProcessing(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!processing) {
    return <button onClick={buyCoin}>Buy</button>;
  } else {
    return <>Processing</>;
  }
}

export default BuyButton;