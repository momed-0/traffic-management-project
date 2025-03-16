import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <nav className="header-nav">
        <ul className="header-div-ul">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/map" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Map</NavLink>
          </li>
          <li>
            <NavLink to="/statistics" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Statistics</NavLink>
          </li>
          <li>
            <NavLink to="/live" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Live Map</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
