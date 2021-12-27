import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Login from "./login/Login";
// import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signingOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/portfolio">Portfolio</Link>
          {isAuth ? (
            <button onClick={signingOut}>Log Out</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
