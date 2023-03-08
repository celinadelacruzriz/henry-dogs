import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <h1>Bienvenid@s</h1>
      <br />
      <h2>María Celina de la Cruz Riz - PT 10A</h2>
      <br />
      <Link to="/dogs">
        <button className="button">ENTRAR</button>
      </Link>
    </div>
  );
}
