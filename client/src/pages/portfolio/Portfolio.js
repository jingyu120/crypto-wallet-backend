import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioTable from "./PortfolioTable";

export default function Portfolio({ currentUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1> Portfolio</h1>
      <PortfolioTable />
    </div>
  );
}
