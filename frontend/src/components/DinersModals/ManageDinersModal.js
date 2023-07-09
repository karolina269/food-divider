import ManageDinerForm from "./ManageDinerForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./ManageDinersModal.css";

const ManageDinersModal = (props) => {
  return (
    <section className="manageDiners">
      <FontAwesomeIcon icon={faXmark} className="closeModal" onClick={() => props.setShowModalManage(false)} />
      {props.diners.map((diner) => {
        return (
          <ManageDinerForm
            diner={diner}
            key={diner._id}
            setDiners={props.setDiners}
            diners={props.diners}
            chosenDiners={props.chosenDiners}
            setChosenDiners={props.setChosenDiners}
          />
        );
      })}
    </section>
  );
};

export default ManageDinersModal;
