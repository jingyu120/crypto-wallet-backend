import React from "react";
import ChatComponent from "../chat/ChatComponent";
import CryptoComponent from "../crypto/CryptoComponent";

export default function Home() {
  return (
    <div>
      <CryptoComponent />
      <ChatComponent />
    </div>
  );
}
