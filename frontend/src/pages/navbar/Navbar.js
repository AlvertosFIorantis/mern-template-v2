import React from "react";
import "./navbar.css";
import { MdPerson } from "react-icons/md";
import { AiOutlineSolution } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";
import Settings from "../../icons/Settings";
// afto eiani arketa xrisimo an thelo na xrisimopiso diafora icons se diaforetika komatiao tou app mou kai thelo pada na exoun to idio megethos kai xroma KAI meta kano wrap to main compoonmet mou edo eiani to div class sto componet app mias kai ola ta ala componet tha einai mesa se afto

export default function Navbar() {
  return (
    <IconContext.Provider value={{ className: "nav-link-icons" }}>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="logo1">
            <NavLink to="/home" exact className="nav-link">
              <span className="link-text">Home Portal</span>
              <FaHome />
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/" exact className="nav-link">
              <AiOutlineSolution />
              <span className="link-text">Sign Up</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/login" exact className="nav-link">
              <MdPerson />

              <span className="link-text">Login</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard" exact className="nav-link">
              <Settings className="nav-link-icons" />
              {/* apo ti stigmi pou xrisimopio custom svg gia icon prepei na peraos to idio class pou exo iconContexProvider kai afora ola ta ala icons pou exo kanei import apo to react-icon */}
              <span className="link-text">dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/chartSummary" exact className="nav-link">
              <Settings className="nav-link-icons" />
              {/* apo ti stigmi pou xrisimopio custom svg gia icon prepei na peraos to idio class pou exo iconContexProvider kai afora ola ta ala icons pou exo kanei import apo to react-icon */}
              <span className="link-text">Charts</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dragable" exact className="nav-link">
              <Settings className="nav-link-icons" />
              {/* apo ti stigmi pou xrisimopio custom svg gia icon prepei na peraos to idio class pou exo iconContexProvider kai afora ola ta ala icons pou exo kanei import apo to react-icon */}
              <span className="link-text">Dragable</span>
            </NavLink>
          </li>

          <li className="nav-item" id="themeButton">
            <NavLink to="/logout" exact className="nav-link">
              <FaUserAltSlash size="100px" />
              <span className="link-text">Log out</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

// https://react-icons.github.io/react-icons/icons?name=md
