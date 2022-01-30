import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";

export const BalanceContext = React.createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(null);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/${currentUser.email}/balance`)
      .then((res) => {
        setBalance(res.data);
      });
  }, [currentUser.email]);

  return (
    <BalanceContext.Provider
      value={{
        balance,
        setBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
