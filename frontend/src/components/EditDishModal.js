import { useState } from "react";
import axios from "axios";

const EditDishModal = (props) => {
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

  const editDish = (e) => {
    e.preventDefault();
    console.log("edytuje naczynie o id:", props.chosenDish.id);
    axios.get("http://localhost:3005/dishes/edit/" + props.chosenDish.id, formData).then(() => {
      props.getDishes();
    });
  };

  return (
    <form className="formNewDish" onSubmit={editDish}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" placeholder="dish name" value={formData.name} onChange={handleInputChange} />

      <label htmlFor="weight">Weight:</label>
      <input type="number" name="weight" placeholder="dish weight" value={formData.weight} onChange={handleInputChange} />

      <button className="btn" accessKey="s" title="acces key: s">
        Save
      </button>
    </form>
  );
};

export default EditDishModal;
