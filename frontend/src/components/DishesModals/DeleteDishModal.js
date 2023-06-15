import axios from "axios";

const DeleteDishModal = (props) => {
  const deleteDish = () => {
    console.log("kasuje");
    axios.delete("http://localhost:3005/dishes/delete/" + props.chosenDish.key).then(() => {
      props.getDishes();
    });
    props.handleCloseModalDelete();
  };

  return (
    <section className="formDish">
      Are you sure you want to delete <span>{props.chosenDish.name}?</span>
      <button className="btn" onClick={deleteDish}>
        Yes
      </button>
    </section>
  );
};

export default DeleteDishModal;
