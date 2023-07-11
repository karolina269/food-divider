import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./AppNav.css";

const AppNav = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [icon, setIcon] = useState(faBars);
  const nodeRef = useRef(null);

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:3005/user/delete/" + props.user._id)
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
    <header>
      <h1>Food Divider</h1>
      <nav className="mainNav">
        <FontAwesomeIcon icon={icon} className="menuBars" onClick={() => setMenuOpen(!menuOpen)} />
        <CSSTransition
          in={menuOpen}
          nodeRef={nodeRef}
          timeout={0}
          classNames="mainNavList"
          unmountOnExit
          onEnter={() => setIcon(faXmark)}
          onExit={() => setIcon(faBars)}>
          <ul ref={nodeRef} className="mainNavList" onMouseLeave={() => setMenuOpen(false)}>
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
        </CSSTransition>
      </nav>
    </header>
  );
};

export default AppNav;
