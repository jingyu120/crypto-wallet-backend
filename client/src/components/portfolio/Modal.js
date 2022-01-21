import React, { useEffect, useState } from "react";
import BuyButton from "../crypto/BuyButton";
import "./Modal.css";
import axios from "axios";

function Modal({ setOpenModal, coinName, transaction }) {
  const [quantity, setQuantity] = useState(0);
  const [cryptoList, setCryptoList] = useState({});

  useEffect(() => {
    axios
      .get("https://api.coinlore.net/api/tickers/?start=0&limit=10")
      .then((response) => {
        setCryptoList(response.data.data);
      });
  }, []);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>{transaction + " " + coinName}</h1>
        </div>
        <div className="body">
          <input
            className="transaction-input"
            placeholder="Amount"
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
          ></input>
          <input placeholder="Cost"></input>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          {transaction === "Buy" ? <BuyButton coinName={coinName} /> : null}
        </div>
      </div>
    </div>
  );
}

export default Modal;
