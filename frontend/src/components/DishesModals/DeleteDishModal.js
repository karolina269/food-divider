import axios from "axios";

const DeleteDishModal = (props) => {
  const deleteDish = () => {
    axios.delete("http://localhost:3005/dishes/delete/" + props.chosenDish.key).then((res) => {
      props.setDishes(props.dishes.filter((dish) => dish._id !== props.chosenDish.key));
      props.clear();
      console.log(res.data.message);
    });
    props.handleCloseModalDelete();
  };

  return (
    <section className="formDish">
      Are you sure you want to delete <span>{props.chosenDish.name}?</span>
      <div className="buttonsWrapper">
        <button className="btn cancel" onClick={props.handleCloseModalDelete}>
          Cancel
        </button>
        <button className="btn" onClick={deleteDish}>
          Yes
        </button>
      </div>
    </section>
  );
};

export default DeleteDishModal;
