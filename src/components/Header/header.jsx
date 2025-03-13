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
            <NavLink to="/data" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Data</NavLink>
          </li>
          <li>
            <NavLink to="/x" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>X</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
