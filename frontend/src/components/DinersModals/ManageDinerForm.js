import { useState } from "react";
import axios from "axios";

const ManageDinerForm = (props) => {
  const [formData, setFormData] = useState({
    name: props.diner.name,
    calories: props.diner.calories,
  });

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };
  const editAndSaveDiner = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3005/diners/edit/" + props.diner._id, formData)
      .then(() => {
        //zedytowac we froncie
      })
      .catch((error) => console.error(error));
  };

  const deleteDiner = () => {
    axios.delete("http://localhost:3005/diners/delete/" + props.diner._id).then(() => {
      props.setDiners(props.diners.filter((diner) => diner._id !== props.diner._id));
    });
  };

  return (
    <form key={props.diner._id} noValidate onSubmit={editAndSaveDiner}>
      <div className="outerInputsWrapper">
        <div className="inputWrapper">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" defaultValue={props.diner.name} onChange={handleInputChange} />
        </div>
        <div className="inputWrapper">
          <label htmlFor="calories">Calories:</label>
          <input type="number" name="calories" defaultValue={props.diner.calories} onChange={handleInputChange} />
        </div>
      </div>
      <button type="submit" className="btn">
        Save
      </button>
      <button type="button" className="btn" onClick={deleteDiner}>
        Delete
      </button>
    </form>
  );
};

export default ManageDinerForm;
