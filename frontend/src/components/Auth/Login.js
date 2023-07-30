import axios from "axios";
import { useState } from "react";
import useFormData from "../hooks/useFormData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = (props) => {
  const [icon, setIcon] = useState(faEye);
  const [passwordInputType, setPasswordInputType] = useState("password");

  const togglePasswordVisibility = () => {
    if (passwordInputType === "password") {
      setIcon(faEyeSlash);
      setPasswordInputType("text");
    } else if (passwordInputType === "text") {
      setIcon(faEye);
      setPasswordInputType("password");
    }
  };
  const { formData, handleInputChange } = useFormData({
    email: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState("");

  const validate = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
      setLoginMessage("This doesn't look like an email address");
      return false;
    }
    if (
      formData.password.trim().length < 6 ||
      !/^[^\s]*$/.test(formData.password.trim()) ||
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())
    ) {
      setLoginMessage("Login details are not correct");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    } else {
      axios
        .post("http://localhost:3005/user/login", {
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          setLoginMessage("");
          props.setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          console.log(res.data);
        })
        .catch((error) => setLoginMessage(error.response.data.message));
    }
  };

  return (
    <main className="login">
      <form onSubmit={handleSubmit} noValidate>
        <div className="formField">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div className="formField password">
          <label htmlFor="password">Password:</label>
          <input type={passwordInputType} name="password" placeholder="********" value={formData.password} onChange={handleInputChange} />
          <FontAwesomeIcon icon={icon} className="passwordToggle" onClick={() => togglePasswordVisibility()} />
        </div>
        {loginMessage && <p className="error">{loginMessage}</p>}
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
