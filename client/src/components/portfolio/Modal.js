import React, { useEffect, useState } from "react";
import BuyButton from "../crypto/BuyButton";
import "./Modal.css";

function Modal({ setOpenModal, coinName, transaction }) {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {});

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal((prev) => ({
                ...prev,
                modalOpen: false,
              }));
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
          {transaction === "Buy" && !loading ? (
            <BuyButton
              coinName={coinName}
              coinAmount={quantity}
              setLoading={setLoading}
            />
          ) : (
            "Processing"
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
