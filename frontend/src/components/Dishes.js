import axios from "axios";
import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Select from "react-select";
import NewDishModal from "./DishesModals/NewDishModal";
import EditDishModal from "./DishesModals/EditDishModal";
import DeleteDishModal from "./DishesModals/DeleteDishModal";

import "./Dishes.css";

ReactModal.setAppElement("#root");

const Dishes = (props) => {
  const [dishes, setDishes] = useState([]);
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const getDishes = () => {
    axios.get("http://localhost:3005/dishes/all").then((res) => {
      setDishes(res.data);
    });
  };

  useEffect(() => {
    getDishes();
  }, []);

  const chooseDish = (e) => {
    console.log(e);
    props.setChosenDish(e);
  };

  const handleOpenModalNew = () => {
    setShowModalNew(true);
  };

  const handleCloseModalNew = () => {
    setShowModalNew(false);
  };

  const handleOpenModalEdit = () => {
    setShowModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
  };

  const handleOpenModalDelete = () => {
    setShowModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };

  useEffect(() => {
    if (!(Object.keys(props.chosenDish).length === 0 && props.chosenDish.constructor === Object)) {
      setIsDisabled(false);
    }
  }, [props.chosenDish]);

  return (
    <section className="dishes">
      <h2 className="sectionTitle">Choose the dish</h2>
      <Select
        className="dishesSelection"
        options={dishes.map((dish) => ({
          label: dish.name + " - " + dish.weight,
          value: dish.name,
          name: dish.name,
          weight: dish.weight,
          key: dish._id,
        }))}
        onChange={chooseDish}
      />

      <button className="btn edit" onClick={handleOpenModalEdit} disabled={isDisabled}>
        Edit
      </button>

      <button className="btn delete" onClick={handleOpenModalDelete} disabled={isDisabled}>
        Delete
      </button>

      <ReactModal className="modal" isOpen={showModalDelete} contentLabel="Delete dish">
        <button className="closeModal" onClick={handleCloseModalDelete}>
          x
        </button>
        <DeleteDishModal getDishes={getDishes} chosenDish={props.chosenDish} handleCloseModalDelete={handleCloseModalDelete} />
      </ReactModal>

      <ReactModal className="modal" isOpen={showModalEdit} contentLabel="edit dish form">
        <button className="closeModal" onClick={handleCloseModalEdit}>
          x
        </button>
        <EditDishModal getDishes={getDishes} dishes={dishes} chosenDish={props.chosenDish} />
      </ReactModal>

      <button className="btn new dish" onClick={handleOpenModalNew}>
        New dish <span>+</span>
      </button>
      <ReactModal className="modal" isOpen={showModalNew} contentLabel="New dish form">
        <button className="closeModal" onClick={handleCloseModalNew}>
          x
        </button>
        <NewDishModal setDishes={setDishes} dishes={dishes} handleCloseModalNew={handleCloseModalNew} />
      </ReactModal>
    </section>
  );
};

export default Dishes;
