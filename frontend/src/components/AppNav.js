import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./AppNav.css";

const AppNav = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [icon, setIcon] = useState(faBars);
  const [unitsOpen, setUnitsOpen] = useState(false);

  const toggleUnits = () => {
    setUnitsOpen(!unitsOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    icon === faBars ? setIcon(faXmark) : setIcon(faBars);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:3005/user/delete/")
      .then(() => {
        console.log("Account has been successfully deleted");
        props.setUser(null);
        localStorage.setItem("user", null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("logout");
    props.setUser(null);
    localStorage.setItem("user", null);
  };

  return (
    <nav className="mainNav">
      <FontAwesomeIcon icon={icon} className="menuBars" onClick={toggleMenu} />
      {menuOpen && (
        <ul className="mainNavList">
          {props.user && (
            <li className="mainNavItem">
              <button onClick={toggleUnits}>
                Weight unit <FontAwesomeIcon icon={faAngleDown} className="units" />
              </button>
              {unitsOpen && (
                <ul className="unitsList">
                  <li>
                    <button onClick={props.setUnit("g")}>Grams</button>
                  </li>
                  <li>
                    <button onClick={props.setUnit("oz")}>Ounces</button>
                  </li>
                </ul>
              )}
            </li>
          )}
          {props.user && (
            <li className="mainNavItem">
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
          {props.user && (
            <li className="mainNavItem">
              <Link to="/" onClick={handleDelete}>
                Delete your account
              </Link>
            </li>
          )}
          <li className="mainNavItem">
            <a href="mailto:karolinastec269@gmail.com">Contact</a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default AppNav;
