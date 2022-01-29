import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useContext } from "react";
import Home from "./components/Home";
import Portfolio from "./components/portfolio/Portfolio";
import Login from "./authentication/Login";
import { auth } from "./authentication/Firebase";
import Registration from "./authentication/Registration";
import { AuthContext } from "./services/authContext";
import { BalanceContext } from "./services/balanceContext";
import Balance from "./components/balance/Balance";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { balance } = useContext(BalanceContext);

  return (
    <div className="App">
      <Router>
        <nav>
          <div>
            <Link to="/">Home</Link>
            {currentUser && <Link to="/portfolio">Portfolio</Link>}
            {currentUser ? (
              <button onClick={() => auth.signOut()}>
                Log Out {currentUser.email}
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
          <div className="rightnav">
            <Link to="/balance">Current Balance: ${balance} </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/portfolio"
            element={<Portfolio currentUser={currentUser} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/balance" element={<Balance />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
