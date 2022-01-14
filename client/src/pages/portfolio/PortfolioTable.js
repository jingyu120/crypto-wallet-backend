import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../authContext/Auth";

function PortfolioTable() {
  const [wallet, setWallet] = useState();
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getCoins", {
        params: {
          email: currentUser.email,
        },
      })
      .then((response) => {
        setWallet(response.data);
      });
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <td>Symbol</td>
          <td>Amount</td>
          <td>Cost</td>
          <td>Total</td>
        </tr>
      </thead>
      <tbody>
        {wallet &&
          wallet.map((coin) => {
            return (
              <tr>
                <td>{coin.name}</td>
                <td>{coin.amount}</td>
                <td>{coin.cost}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default PortfolioTable;
