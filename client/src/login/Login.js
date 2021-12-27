import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth, provider } from "../Firebase";

export default function Login({ setIsAuth }) {
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
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    });
  };

  return (
    <div className="loginPage">
      <input
        placeholder="email"
        onChange={(event) => setLoginEmail(event.target.value)}
      ></input>
      <input
        placeholder="password"
        onChange={(event) => setLoginPassword(event.target.value)}
      ></input>
      <button onClick={login}>Login</button>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}
