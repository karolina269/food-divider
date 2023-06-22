import ManageDinerForm from "./ManageDinerForm";
import "./ManageDinersModal.css";

const ManageDinersModal = (props) => {
  return (
    <section className="manageDiners">
      {props.diners.map((diner) => {
        return <ManageDinerForm diner={diner} key={diner._id} setDiners={props.setDiners} diners={props.diners} getDiners={props.getDiners} />;
      })}
    </section>
  );
};

export default ManageDinersModal;
