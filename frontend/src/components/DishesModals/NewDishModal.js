import { useState } from "react";
import axios from "axios";

import "./DishModal.css";

const NewDishModal = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    weight: "",
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
      weight: false,
    };

    if (formData.name.trim().length === 0) {
      validationErrors.name = true;
      setErrors((prevErrors) => {
        return { ...prevErrors, name: "Enter the name of the dish" };
      });
    } else if (props.dishes.some((dish) => dish.name === formData.name.trim())) {
      validationErrors.name = true;
      setErrors((prevErrors) => {
        return { ...prevErrors, name: "A dish with this name already exists" };
      });
    } else {
      validationErrors.name = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, name: "" };
      });
    }

    if (formData.weight < 0) {
      validationErrors.weight = true;
      setErrors((prevErrors) => {
        return { ...prevErrors, weight: "The weight of the dish must be non-negative" };
      });
    } else {
      validationErrors.weight = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, weight: "" };
      });
    }

    return !validationErrors.name && !validationErrors.weight;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    } else {
      axios.post("http://localhost:3005/dishes/add", formData).then((res) => {
        props.setDishes(props.dishes.concat(res.data));
      });
    }
    props.handleCloseModalNew();
  };

  return (
    <form className="formDish" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <div className="inputWrapper">
        <input type="text" name="name" placeholder="name" value={formData.name} onChange={handleInputChange} />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <label htmlFor="weight">Weight:</label>
      <div className="inputWrapper">
        <input type="number" name="weight" placeholder="weight" value={formData.weight} onChange={handleInputChange} />
        {errors.weight && <p className="error">{errors.weight}</p>}
      </div>
      <button className="btn">Add</button>
    </form>
  );
};

export default NewDishModal;
