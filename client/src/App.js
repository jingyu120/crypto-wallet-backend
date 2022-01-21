import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useContext } from "react";
import Home from "./components/Home";
import Portfolio from "./components/portfolio/Portfolio";
import Login from "./authentication/Login";
import { auth } from "./authentication/Firebase";
import Registration from "./authentication/Registration";
import { AuthContext } from "./services/authContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Home</Link>
          {currentUser && <Link to="/portfolio">Portfolio</Link>}
          {currentUser ? (
            <button onClick={() => auth.signOut()}>
              Log Out {currentUser.email}
            </button>
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
