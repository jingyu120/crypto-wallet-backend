import "./App.css";
import React from "react";
import ChatComponent from "./chat/ChatComponent";
import CryptoComponent from "./crypto/CryptoComponent";

function App() {
  return (
    <div className="App">
      <CryptoComponent />
      <ChatComponent />
    </div>
  );
}

export default App;
