import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <input
        placeholder="email"
        onChange={(event) => setLoginEmail(event.target.value)}
      ></input>
      <input
        placeholder="password"
        onChange={(event) => setLoginPassword(event.target.value)}
      ></input>
      <button onClick={login}>Login</button>
    </>
  );
}
