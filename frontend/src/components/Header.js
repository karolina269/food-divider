import AppNav from "./AppNav";

import "./Header.css";

const Header = (props) => {
  return (
    <header>
      <h1>Food Divider</h1>
      <AppNav setUnit={props.setUnit} unit={props.unit} setUser={props.setUser} user={props.user} />
    </header>
  );
};

export default Header;
