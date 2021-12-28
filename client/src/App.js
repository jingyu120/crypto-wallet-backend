import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Login from "./Authentication/Login";
// import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import Registration from "./Authentication/Registration";

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
          {isAuth && <Link to="/portfolio">Portfolio</Link>}
          {isAuth ? (
            <button onClick={signingOut}>Log Out</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/portfolio" element={<Portfolio isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
