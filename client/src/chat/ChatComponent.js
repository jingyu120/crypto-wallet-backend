import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import JoinChat from "./JoinChat";

const socket = io.connect("http://localhost:3001");

export default function ChatComponent() {
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
      {!showChat ? (
        <JoinChat
          setShowChat={setShowChat}
          setUsername={setUsername}
          setRoom={setRoom}
          joinRoom={joinRoom}
        />
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </>
  );
}
