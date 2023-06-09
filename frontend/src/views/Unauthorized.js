import FormPicker from "../components/FormPicker";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { Navigate } from "react-router-dom";
import { useState } from "react";

import "./Unauthorized.css";

const Unauthorized = (props) => {
  const [currentForm, setCurrentForm] = useState("signup");

  const switchForm = (e) => {
    setCurrentForm(e.target.value);
  };

  return (
    <main className="unauthorized">
      {props.user && <Navigate to="/" />}
      <FormPicker switchForm={switchForm} />
      {currentForm === "signup" ? <Signup /> : <Login setUser={props.setUser} />}
    </main>
  );
};

export default Unauthorized;
