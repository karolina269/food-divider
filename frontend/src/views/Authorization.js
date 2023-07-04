import FormPicker from "../components/auth/FormPicker";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import { Navigate } from "react-router-dom";
import { useState } from "react";

import "./Authorization.css";

const Authorization = (props) => {
  const [currentForm, setCurrentForm] = useState("signup");

  if (props.user) {
    return <Navigate to="/" />;
  }

  return (
    <main className="authorization">
      <FormPicker switchForm={(e) => setCurrentForm(e.target.value)} />
      {currentForm === "signup" ? <Signup /> : <Login setUser={props.setUser} />}
    </main>
  );
};

export default Authorization;
