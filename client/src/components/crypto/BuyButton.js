import React, { useContext } from "react";
import { auth } from "../../authentication/Firebase";
import axios from "axios";
import { CryptoContext } from "../../services/cryptoContext";
function BuyButton({ coinName, coinAmount }) {
  const { cryptoId } = useContext(CryptoContext);
  let coinPrice = null;
  const buyCoin = () => {
    try {
      axios
        .get(`https://api.coinlore.net/api/ticker/?id=${cryptoId[coinName]}`)
        .then((res) => {
          coinPrice = res.data[0].price_usd;
        })
        .then(() => {
          const data = {
            email: auth.currentUser.email,
            name: coinName,
            amount: Number(coinAmount),
            cost: Number(coinAmount * coinPrice),
          };
          axios.post("http://localhost:3001/addCoin", data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  return <button onClick={buyCoin}>Buy</button>;
}

export default BuyButton;
