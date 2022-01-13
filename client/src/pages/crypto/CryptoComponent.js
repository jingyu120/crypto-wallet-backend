import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./CyrptoComponent.css";
import BuyAmount from "./BuyAmount";
import { AuthContext } from "../../authContext/Auth";

export default function CryptoComponent() {
  const [cryptoList, setCryptoList] = useState({});
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("https://api.coinlore.net/api/tickers/?start=0&limit=10")
      .then((response) => {
        setCryptoList(response.data.data);
      });
  }, []);
  return (
    <div className="crypto-table">
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price USD</th>
            <th>% Change</th>
            {currentUser && (
              <>
                <th>Buy</th>
                <th>Cost</th>
              </>
            )}

            {/* <th>Volume</th> */}
          </tr>
        </thead>
        <tbody>
          {cryptoList.length > 0 &&
            cryptoList.map((coin) => {
              return (
                <tr key={coin.id}>
                  <td>{coin.symbol}</td>
                  <td>{coin.name}</td>
                  <td>${coin.price_usd}</td>
                  <td>{coin.percent_change_24h}</td>
                  {currentUser && (
                    <>
                      <BuyAmount
                        coinCost={coin.price_usd}
                        coinName={coin.symbol}
                      />
                    </>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
