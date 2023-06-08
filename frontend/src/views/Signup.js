import axios from "axios";
import { useState } from "react";

const Signup = (props) => {
  const [formData, setFormData] = useState({
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

  const [signupDone, setSignupDone] = useState(false);

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
      validationErrors.password = true;
      setErrors((prevErrors) => {
        return { ...prevErrors, confirmPassword: "Confirm password does not match password" };
      });
    } else {
      validationErrors.password = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, confirmPassword: "" };
      });
    }

    return !validationErrors.email && !validationErrors.password && !validationErrors.confirmPassword;
  };

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
        })
        .catch((error) => console.log(error));
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
        <div className="formField">
          <button className="btn" disabled={signupDone}>
            Signup
          </button>
        </div>
      </form>
    </main>
  );
};

export default Signup;
