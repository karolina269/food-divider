import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./AppNav.css";

const AppNav = () => {
  const toggleMenu = () => {
    console.log("toggleMenu");
  };
  return <FontAwesomeIcon icon={faBars} className="menuBars" onClick={toggleMenu} />;
};

export default AppNav;
