import ConfirmDelete from "./ConfirmDelete";
import { useRef, useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import "./ManageDinerForm.css";

const ManageDinerForm = (props) => {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: props.diner.name,
    calories: props.diner.calories,
  });
  const [updateMessage, setUpdateMessage] = useState("");
  const nodeRef = useRef(null);
  const [triggerMessage, setTriggerMessage] = useState(false);
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

  const handleCloseModalConfirm = () => {
    setShowModalConfirm(false);
  };

  const validate = () => {
    let validationErrors = {
      name: false,
      calories: false,
    };

    if (formData.name.trim().length === 0) {
      validationErrors.name = true;
      setUpdateMessage("");
      setErrors((prevErrors) => {
        return { ...prevErrors, name: "Enter the name of the diner" };
      });
    } else if (props.diners.some((diner) => diner.name === formData.name.trim() && formData.name.trim() !== props.diner.name)) {
      validationErrors.name = true;
      setUpdateMessage("");
      setErrors((prevErrors) => {
        return { ...prevErrors, name: "A diner with this name already exists" };
      });
    } else {
      validationErrors.name = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, name: "" };
      });
    }

    if (formData.calories <= 0) {
      validationErrors.calories = true;
      setUpdateMessage("");
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
      setTriggerMessage(false);
      axios
        .post("http://localhost:3005/diners/edit/" + props.diner._id, formData)
        .then((res) => {
          const index = props.diners.findIndex((diner) => diner._id === props.diner._id);
          props.setDiners(
            props.diners.toSpliced(index, 1, {
              ...props.diners[index],
              name: formData.name,
              calories: formData.calories,
            })
          );
          const chosenIndex = props.chosenDiners.findIndex((diner) => diner.key === props.diner._id);
          if (chosenIndex >= 0) {
            props.setChosenDiners(
              props.chosenDiners.toSpliced(chosenIndex, 1, {
                ...props.chosenDiners[chosenIndex],
                label: formData.name + " - " + formData.calories + " kcal",
                name: formData.name,
                calories: formData.calories,
              })
            );
          }
          setUpdateMessage(res.data.message);
          setTriggerMessage(true);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <form key={props.diner._id} noValidate onSubmit={handleSubmit}>
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
        <button type="button" className="btn delete" onClick={() => setShowModalConfirm(true)}>
          Delete
        </button>
        <ReactModal className="modal" isOpen={showModalConfirm} contentLabel="Confirm delete diner">
          <ConfirmDelete
            setDiners={props.setDiners}
            diner={props.diner}
            diners={props.diners}
            setChosenDiners={props.setChosenDiners}
            chosenDiners={props.chosenDiners}
            handleCloseModalConfirm={handleCloseModalConfirm}
          />
        </ReactModal>
        {errors.name && <p className="error">{errors.name}</p>}
        {errors.calories && <p className="error">{errors.calories}</p>}
        <CSSTransition in={triggerMessage} nodeRef={nodeRef} timeout={0} mountOnEnter unmountOnExit classNames="updateMessage">
          <p ref={nodeRef} className="updateMessage">
            {updateMessage}
          </p>
        </CSSTransition>
      </form>
    </>
  );
};

export default ManageDinerForm;
