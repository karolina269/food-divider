import { useState } from "react";
import axios from "axios";

const NewDinerModal = (props) => {
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

  const addNewDiner = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3005/diners/add", formData).then((res) => {
      props.setDiners(props.diners.concat(res.data));
    });
    props.handleCloseModalNew();
  };

  return (
    <form className="formNewDiner" onSubmit={addNewDiner}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" placeholder="diner name" value={formData.name} onChange={handleInputChange} />

      <label htmlFor="calories">Calories:</label>
      <input type="number" name="calories" placeholder="diner calories" value={formData.calories} onChange={handleInputChange} />

      <button className="btn">Add</button>
    </form>
  );
};

export default NewDinerModal;
