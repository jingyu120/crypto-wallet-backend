import React from "react";

export default function JoinChat({
  setShowChat,
  setUsername,
  setRoom,
  joinRoom,
}) {
  return (
    <div className="joinChatContainer">
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter Room ID"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
        onKeyPress={(event) => event.key === "Enter" && joinRoom()}
      />
      <button onClick={joinRoom}>Join a Room</button>
    </div>
  );
}
