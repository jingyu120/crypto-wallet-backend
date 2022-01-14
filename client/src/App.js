import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useContext } from "react";
import Home from "./pages/Home";
import Portfolio from "./pages/portfolio/Portfolio";
import Login from "./authentication/Login";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import Registration from "./authentication/Registration";
import { AuthContext } from "./authContext/Auth";

function App() {
  const { currentUser } = useContext(AuthContext);
  const signingOut = () => {
    signOut(auth).then(() => {
      window.location.pathname = "/login";
    });
  };

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Home</Link>
          {console.log("current user:", currentUser)}
          {currentUser && <Link to="/portfolio">Portfolio</Link>}
          {currentUser ? (
            <button onClick={signingOut}>Log Out</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/portfolio"
            element={<Portfolio currentUser={currentUser} />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
