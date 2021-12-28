import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../Firebase";
import "./Login.css";

export default function Login({ setIsAuth }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="loginPage">
      <div className="input-fields">
        <input
          placeholder="email"
          onChange={(event) => setLoginEmail(event.target.value)}
        ></input>
        <input
          placeholder="password"
          onChange={(event) => setLoginPassword(event.target.value)}
        ></input>
      </div>
      <div className="sign-in-btns">
        <button onClick={login}>Login</button>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
      <button
        onClick={() => {
          navigate("/registration");
        }}
      >
        Registration
      </button>
    </div>
  );
}
