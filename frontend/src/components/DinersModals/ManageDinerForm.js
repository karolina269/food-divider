import ConfirmDelete from "./ConfirmDelete";
import { useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import "./ManageDinerForm.css";

const ManageDinerForm = (props) => {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: props.diner.name,
    calories: props.diner.calories,
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };
  const editAndSaveDiner = (e) => {
    console.log("editAndSaveDiner");
    e.preventDefault();
    axios
      .post("http://localhost:3005/diners/edit/" + props.diner._id, formData)
      .then((res) => {
        props.getDiners();
        setMessage(res.data.message);
      })
      .catch((error) => console.error(error));
  };

  const handleOpenModalConfirm = () => {
    setShowModalConfirm(true);
  };

  const handleCloseModalConfirm = () => {
    setShowModalConfirm(false);
  };

  return (
    <>
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
        <button type="button" className="btn delete" onClick={handleOpenModalConfirm}>
          Delete
        </button>
        <ReactModal className="modal" isOpen={showModalConfirm} contentLabel="Confirm delete diner">
          <button className="closeModal" onClick={handleCloseModalConfirm}>
            x
          </button>
          <ConfirmDelete
            setDiners={props.setDiners}
            diner={props.diner}
            diners={props.diners}
            handleCloseModalConfirm={handleCloseModalConfirm}
            value={props.value}
            setValue={props.setValue}
            options={props.options}
            setOptions={props.setOptions}
          />
        </ReactModal>
        <p className="message">{message}</p>
      </form>
    </>
  );
};

export default ManageDinerForm;
