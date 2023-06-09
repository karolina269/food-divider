import { useState, useEffect } from "react";
import axios from "axios";
import { gToOz } from "../../views/Home";

import "./DishModal.css";

const EditDishModal = (props) => {
  const [formData, setFormData] = useState({
    name: props.chosenDish.name,
    weight: props.chosenDish.weight,
  });

  const [errors, setErrors] = useState({
    name: "",
    weight: "",
  });

  useEffect(() => {
    props.unit === "g"
      ? setFormData({
          name: props.chosenDish.name,
          weight: props.chosenDish.weight,
        })
      : setFormData({
          name: props.chosenDish.name,
          weight: Math.round(props.chosenDish.weight * gToOz * 100) / 100,
        });
  }, [props.unit, props.chosenDish]);

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
    } else if (props.chosenDish.name !== formData.name.trim() && props.dishes.some((dish) => dish.name === formData.name.trim())) {
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
      if (props.unit === "oz") {
        setFormData({ ...formData, weight: formData.weight * gToOz });
      }
      axios.post("http://localhost:3005/dishes/edit/" + props.chosenDish.key, formData).then(() => {
        const index = props.dishes.findIndex((dish) => dish._id === props.chosenDish.key);
        props.setDishes(
          props.dishes.toSpliced(index, 1, {
            ...props.dishes[index],
            name: formData.name,
            weight: formData.weight,
          })
        );
        props.setChosenDish({ ...props.chosenDish, name: formData.name, weight: formData.weight });
      });
    }
    props.handleCloseModalEdit();
  };

  return (
    <form className="formDish" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <div className="inputWrapper">
        <input type="text" name="name" placeholder="dish name" value={formData.name} onChange={handleInputChange} />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <label htmlFor="weight">Weight ({props.unit}):</label>
      <div className="inputWrapper">
        <input type="number" name="weight" placeholder="dish weight" value={formData.weight} onChange={handleInputChange} />
        {errors.weight && <p className="error">{errors.weight}</p>}
      </div>
      <div className="buttonsWrapper">
        <button type="button" className="btn cancel" onClick={props.handleCloseModalEdit}>
          Cancel
        </button>
        <button type="submit" className="btn add">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditDishModal;
