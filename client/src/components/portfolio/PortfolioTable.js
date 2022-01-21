import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../services/authContext";
// import BuyButton from "../crypto/BuyButton";
// import BuyAmount from "../crypto/BuyAmount";
import Modal from "./Modal";
import "./PortfolioTable.css";

function PortfolioTable() {
  const [wallet, setWallet] = useState();
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);

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

    // eslint-disable-next-line
  }, []);
  return (
    <div className="portfolio-table">
      <table>
        <thead>
          <tr>
            <td>Symbol</td>
            <td>Amount</td>
            <td>Cost</td>
            <td>Buy/Sell</td>
            {/* <td>Total</td> */}
          </tr>
        </thead>
        <tbody>
          {wallet &&
            wallet.map((coin) => {
              return (
                <tr key={coin._id}>
                  <td>{coin.name}</td>
                  <td>{coin.amount}</td>
                  <td>{coin.cost}</td>
                  <td>
                    <button
                      className="openModalBtn buy"
                      onClick={() => setBuyModalOpen(true)}
                    >
                      Buy
                    </button>
                    <button
                      className="openModalBtn sell"
                      onClick={() => setSellModalOpen(true)}
                    >
                      Sell
                    </button>
                    {buyModalOpen && (
                      <Modal
                        setOpenModal={setBuyModalOpen}
                        coinName={coin.name}
                        transaction={"Buy"}
                      />
                    )}
                    {sellModalOpen && (
                      <Modal
                        setOpenModal={setSellModalOpen}
                        coinName={coin.name}
                        transaction={"Sell"}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default PortfolioTable;
