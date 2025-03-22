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
<<<<<<< HEAD
            <NavLink to="/statistics" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Statistics</NavLink>
          </li>
          <li>
=======
>>>>>>> 14fa9f973e246b166e06a200410a8856421bcd9e
            <NavLink to="/simulation" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Simulation</NavLink>
          </li>
          <li>
            <NavLink to="/traffic" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Traffic Management</NavLink>
          </li>
          <li>
<<<<<<< HEAD
=======
            <NavLink to="/statistics" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Statistics</NavLink>
          </li>
          <li>
>>>>>>> 14fa9f973e246b166e06a200410a8856421bcd9e
            <NavLink to="/live" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Live Map</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
