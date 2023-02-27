import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <div>
        <h1>Bienvenid@s</h1>
      </div>
      <div className="center">
        <h2>María Celina de la Cruz Riz - PT 10A</h2>
      </div>
      <div className="footer">
        <Link to="/dogs" className="button">
          <button>{` ENTRAR `}</button>
        </Link>
      </div>
    </div>
  );
}
