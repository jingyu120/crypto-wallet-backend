import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";

export const BalanceContext = React.createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(null);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    if (currentUser) {
      axios
        .get(`http://localhost:3001/api/user/${currentUser.email}/balance`)
        .then((res) => {
          setBalance(res.data);
        });
    }
  }, [currentUser]);

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
