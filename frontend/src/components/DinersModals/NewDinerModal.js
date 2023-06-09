import { useState } from "react";
import axios from "axios";

import "./NewDinerModal.css";

const NewDinerModal = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    calories: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    calories: "",
  });

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const validate = () => {
    let validationErrors = {
      name: false,
      calories: false,
    };

    if (formData.name.trim().length === 0) {
      validationErrors.name = true;
      setErrors((prevErrors) => {
        return { ...prevErrors, name: "Enter the name of the diner" };
      });
    } else if (props.diners.some((diner) => diner.name === formData.name.trim())) {
      validationErrors.name = true;
      setErrors((prevErrors) => {
        return { ...prevErrors, name: "A diner with this name already exists" };
      });
    } else {
      validationErrors.name = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, name: "" };
      });
    }

    if (formData.calories < 0) {
      validationErrors.calories = true;
      setErrors((prevErrors) => {
        return { ...prevErrors, calories: "The calorie intake must be positive" };
      });
    } else {
      validationErrors.calories = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, calories: "" };
      });
    }

    return !validationErrors.name && !validationErrors.calories;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    } else {
      axios.post("http://localhost:3005/diners/add", formData).then((res) => {
        props.setDiners(props.diners.concat(res.data));
        props.setChosenDiners(props.chosenDiners.concat({ ...res.data, label: formData.name + " - " + formData.calories + " kcal", key: res.data._id }));
      });
    }
    props.handleCloseModalNew();
  };

  return (
    <form className="formNewDiner" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <div className="inputWrapper">
        <input type="text" name="name" placeholder="name" value={formData.name} onChange={handleInputChange} />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <label htmlFor="calories">Calories:</label>
      <div className="inputWrapper">
        <input type="number" name="calories" placeholder="daily calorie intake" value={formData.calories} onChange={handleInputChange} />
        {errors.calories && <p className="error">{errors.calories}</p>}
      </div>
      <div className="buttonsWrapper">
        <button type="button" className="btn cancel" onClick={props.handleCloseModalNew}>
          Cancel
        </button>
        <button type="submit" className="btn add">
          Add
        </button>
      </div>
    </form>
  );
};

export default NewDinerModal;
