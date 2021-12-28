import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

export default function Portfolio({ isAuth }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <h1> Portfolio</h1>
    </div>
  );
}
