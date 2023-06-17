import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./AppNav.css";
import { useState } from "react";

const AppNav = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="mainNav">
      <FontAwesomeIcon icon={faBars} className="menuBars" onMouseOver={toggleMenu} />
      {menuOpen && (
        <ul className="mainNavList">
          <li className="mainNavItem">
            <a href="">Change the weight unit</a>
          </li>
          <li className="mainNavItem">
            <a href="">Login</a>
          </li>
          <li className="mainNavItem">
            <a href="">Logout</a>
          </li>
          <li className="mainNavItem">
            <a href="">Contact</a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default AppNav;
