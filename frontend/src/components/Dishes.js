import axios from "axios";
import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Select from "react-select";
import NewDishModal from "./dishesModals/NewDishModal";
import EditDishModal from "./dishesModals/EditDishModal";
import DeleteDishModal from "./dishesModals/DeleteDishModal";
import { gToOz } from "../views/Home";

import "./Dishes.css";

ReactModal.setAppElement("#root");

const Dishes = (props) => {
  const [dishes, setDishes] = useState([]);
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState("");

  const getDishes = () => {
    axios.get("http://localhost:3005/dishes/all").then((res) => {
      setDishes(res.data);
    });
  };

  useEffect(() => {
    getDishes();
  }, []);

  const chooseDish = (e) => {
    //próbuje zrobić tak, żeby przy clear nie wyskakiwał błąd, ale nie udaje się
    if (!(Object.keys(e).length === 0 && e.constructor === Object)) {
      props.setChosenDish(e);
    } else {
      props.setChosenDish({});
    }
  };

  const handleCloseModalNew = () => {
    setShowModalNew(false);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
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
          value: dish.name,
          name: dish.name,
          weight: dish.weight,
          key: dish._id,
        }))}
        getOptionLabel={(option) =>
          option.name +
          " - " +
          (props.unit === "g" ? Math.round(option.weight * 100) / 100 : Math.round(option.weight * gToOz * 100) / 100) +
          " " +
          props.unit
        }
        onChange={chooseDish}
        //ta linijka chyba nic nie zmienia:
        // defaultValue={value}
        isClearable={true}
      />

      <button className="btn edit" onClick={() => setShowModalEdit(true)} disabled={isDisabled}>
        Edit
      </button>
      <button className="btn delete" onClick={() => setShowModalDelete(true)} disabled={isDisabled}>
        Delete
      </button>
      <ReactModal className="modal" isOpen={showModalDelete} contentLabel="Delete dish">
        <button className="closeModal" onClick={handleCloseModalDelete}>
          x
        </button>
        <DeleteDishModal getDishes={getDishes} chosenDish={props.chosenDish} handleCloseModalDelete={handleCloseModalDelete} setValue={setValue} />
      </ReactModal>
      <ReactModal className="modal" isOpen={showModalEdit} contentLabel="edit dish form">
        <button className="closeModal" onClick={handleCloseModalEdit}>
          x
        </button>
        <EditDishModal getDishes={getDishes} dishes={dishes} chosenDish={props.chosenDish} unit={props.unit} handleCloseModalEdit={handleCloseModalEdit} />
      </ReactModal>
      <button className="btn new dish" onClick={() => setShowModalNew(true)}>
        New dish <span>+</span>
      </button>
      <ReactModal className="modal" isOpen={showModalNew} contentLabel="New dish form">
        <button className="closeModal" onClick={handleCloseModalNew}>
          x
        </button>
        <NewDishModal setDishes={setDishes} dishes={dishes} handleCloseModalNew={handleCloseModalNew} unit={props.unit} setValue={setValue} />
      </ReactModal>
    </section>
  );
};

export default Dishes;
