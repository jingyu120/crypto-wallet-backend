import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CyrptoComponent.css";

export default function CryptoComponent() {
  const [cryptoList, setCryptoList] = useState({});
  useEffect(() => {
    axios
      .get("https://api.coinlore.net/api/tickers/?start=0&limit=10")
      .then((response) => {
        setCryptoList(response.data.data);
        console.log(response.data.data);
      });
  }, []);
  return (
    <div className="crypto-table">
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            {/* <th>Rank</th> */}
            <th>Price USD</th>
            <th>% Change</th>
            <th>Market Cap</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {cryptoList.length > 0 &&
            cryptoList.map((coin) => {
              return (
                <tr key={coin.id}>
                  <td>{coin.symbol}</td>
                  <td>{coin.name}</td>
                  <td>{coin.price_usd}</td>
                  <td>{coin.percent_change_24h}</td>
                  <td>{coin.market_cap_usd}</td>
                  <td>{coin.volume24}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
