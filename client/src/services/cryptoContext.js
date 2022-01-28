import React, { useEffect, useState } from "react";
import axios from "axios";

export const CryptoContext = React.createContext();

export const CryptoProvider = ({ children }) => {
  const [cryptoId, setCryptoId] = useState({});
  const [cryptoLists, setCryptoList] = useState([]);

  useEffect(() => {
    axios.get("https://api.coinlore.net/api/tickers/").then((response) => {
      const data = response.data.data;
      setCryptoList(response.data.data);
      for (const key of Object.keys(data)) {
        const symbol = data[key].symbol;
        const id = data[key].id;
        setCryptoId((prev) => ({ ...prev, [symbol]: id }));
      }
    });
  }, []);

  return (
    <CryptoContext.Provider
      value={{
        cryptoId,
        cryptoLists,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
