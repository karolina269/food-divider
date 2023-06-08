import FormPicker from "../components/FormPicker";
import Signup from "./Signup";
import Login from "./Login";

import { useState } from "react";

import "./Unregistered.css";

const Unregistered = (props) => {
  const [currentForm, setCurrentForm] = useState("signup");

  const switchForm = (e) => {
    setCurrentForm(e.target.value);
    console.log("przełączam formularz");
  };

  return (
    <main className="unregistered">
      <FormPicker switchForm={switchForm} />
      {currentForm === "signup" ? <Signup user={props.user} /> : <Login setUser={props.setUser} />}
    </main>
  );
};

export default Unregistered;
