import FormPicker from "../components/FormPicker";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { Navigate } from "react-router-dom";
import { useState } from "react";

import "./Authorization.css";

const Authorization = (props) => {
  const [currentForm, setCurrentForm] = useState("signup");

  if (props.user) {
    return <Navigate to="/" />;
  }

  const switchForm = (e) => {
    setCurrentForm(e.target.value);
  };

  return (
    <main className="authorization">
      <FormPicker switchForm={switchForm} />
      {currentForm === "signup" ? <Signup /> : <Login setUser={props.setUser} />}
    </main>
  );
};

export default Authorization;
