import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "./Firebase";
import "./Login.css";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
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
      <div>
        <button className="sign-in" onClick={login}>
          Login
        </button>
        <button className="google-sign-in" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
      <div>
        <span className="register">
          Not registered? <Link to={"/registration"}>Create an account</Link>
        </span>
      </div>
      {/* <button
        className="register"
        onClick={() => {
          navigate("/registration");
        }}
      >
        Registration
      </button> */}
    </div>
  );
}
