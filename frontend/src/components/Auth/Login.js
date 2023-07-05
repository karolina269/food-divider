import axios from "axios";
import { useState } from "react";
import useFormData from "../hooks/useFormData";

const Login = (props) => {
  const { formData, handleInputChange } = useFormData({
    email: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3005/user/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        if (res.data.error) {
          setLoginMessage(res.data.message);
        } else {
          setLoginMessage("");
          props.setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          console.log("Logged in", res.data.jwt);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <main className="login">
      <form onSubmit={handleSubmit} noValidate>
        {loginMessage && <h2 className="error">{loginMessage}</h2>}
        <div className="formField">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div className="formField">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="********" value={formData.password} onChange={handleInputChange} />
        </div>
        <div className="formField">
          <button className="btn" title="acces key: l">
            Login
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
