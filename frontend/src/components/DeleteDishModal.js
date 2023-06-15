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
    <section>
      Are you sure you want to delete {props.chosenDish.name}?
      <button className="btn" accessKey="y" title="acces key: y" onClick={deleteDish}>
        Yes
      </button>
    </section>
  );
};

export default DeleteDishModal;
