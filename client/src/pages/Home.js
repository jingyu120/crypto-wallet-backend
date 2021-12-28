import React from "react";
import ChatComponent from "../chat/ChatComponent";
import CryptoComponent from "./CryptoComponent";

export default function Home() {
  return (
    <div>
      <CryptoComponent />
      <ChatComponent />
    </div>
  );
}
