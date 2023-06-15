import { useState } from "react";
import axios from "axios";

const NewDishModal = (props) => {
  const [formData, setFormData] = useState({
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

  const addNewDish = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3005/dishes/add", formData).then((res) => {
      props.setDishes(props.dishes.concat(res.data));
    });
    props.handleCloseModalNew();
  };

  return (
    <form className="formNewDish" onSubmit={addNewDish}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" placeholder="dish name" value={formData.name} onChange={handleInputChange} />

      <label htmlFor="weight">Weight:</label>
      <input type="number" name="weight" placeholder="dish weight" value={formData.weight} onChange={handleInputChange} />

      <button className="btn">Add</button>
    </form>
  );
};

export default NewDishModal;
