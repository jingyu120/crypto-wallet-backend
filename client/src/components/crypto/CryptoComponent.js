import React, { useContext } from "react";
import "./CyrptoComponent.css";
import BuyAmount from "../transaction/BuyAmount";
import { AuthContext } from "../../services/authContext";
import { CryptoContext } from "../../services/cryptoContext";

export default function CryptoComponent() {
  const { currentUser } = useContext(AuthContext);
  const { cryptoLists } = useContext(CryptoContext);

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
          </tr>
        </thead>
        <tbody>
          {cryptoLists.length > 0 &&
            cryptoLists.map((coin) => {
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
