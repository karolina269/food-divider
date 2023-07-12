import axios from "axios";
import { useState } from "react";
import useFormData from "../hooks/useFormData";

const Signup = (props) => {
  const { formData, handleInputChange } = useFormData({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signupMessage, setSignupMessage] = useState("");

  const validate = () => {
    let validationErrors = {
      email: false,
      password: false,
      confirmPassword: false,
    };
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
      validationErrors.email = true;
      setErrors((prevErrors) => {
        return { ...prevErrors, email: "Email address must be valid" };
      });
    } else {
      validationErrors.email = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, email: "" };
      });
    }

    if (formData.password.trim().length < 6) {
      validationErrors.password = true;
      setErrors((prevErrors) => {
        return { ...prevErrors, password: "Password must contain at least 6 characters" };
      });
    } else if (!/^[^\s]*$/.test(formData.password.trim())) {
      validationErrors.password = true;
      setErrors((prevErrors) => {
        return { ...prevErrors, password: "Password must not contain whitespaces" };
      });
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())) {
      validationErrors.password = true;
      console.log("znaki spec");
      setErrors((prevErrors) => {
        return { ...prevErrors, password: "Password must contain at least one special character" };
      });
    } else {
      validationErrors.password = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, password: "" };
      });
    }

    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      validationErrors.confirmPassword = true;
      setErrors((prevErrors) => {
        return { ...prevErrors, confirmPassword: "Passwords do not match" };
      });
    } else {
      validationErrors.confirmPassword = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, confirmPassword: "" };
      });
    }

    return !validationErrors.email && !validationErrors.password && !validationErrors.confirmPassword;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignupMessage("");

    if (!validate()) {
      return;
    } else {
      axios
        .post("http://localhost:3005/user/signup", {
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          console.log(res.data.message);
          axios
            .post("http://localhost:3005/user/login", {
              email: formData.email,
              password: formData.password,
            })
            .then((res) => {
              props.setUser(res.data);
              localStorage.setItem("user", JSON.stringify(res.data));
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => setSignupMessage(error.response.data.message));
    }
  };

  return (
    <main className="signup">
      <form onSubmit={handleSubmit} noValidate>
        <div className="formField">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="formField">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="********" onChange={handleInputChange} />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="formField">
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input type="password" id="confirmPassword " name="confirmPassword" onChange={handleInputChange} placeholder="********" />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        {signupMessage && <p className="error">{signupMessage}</p>}
        <div className="formField">
          <button className="btn">Signup</button>
        </div>
      </form>
    </main>
  );
};

export default Signup;
