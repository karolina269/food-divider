import axios from "axios";
import "./ConfirmDelete.css";

const ConfirmDelete = (props) => {
  const deleteDiner = () => {
    axios.delete("http://localhost:3005/diners/delete/" + props.diner._id).then(() => {
      props.setDiners(props.diners.filter((diner) => diner._id !== props.diner._id));
      props.setChosenDiners(props.chosenDiners.filter((diner) => diner.key !== props.diner._id));
    });
    props.handleCloseModalConfirm();
  };

  return (
    <section className="deleteDiner">
      Are you sure you want to delete <span>{props.diner.name}?</span>
      <button className="btn confirm" onClick={deleteDiner}>
        Yes
      </button>
    </section>
  );
};

export default ConfirmDelete;
