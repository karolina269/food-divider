import axios from "axios";
import { useState } from "react";
import useFormData from "../hooks/useFormData";

const Login = (props) => {
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
        <div className="formField">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="********" value={formData.password} onChange={handleInputChange} />
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
