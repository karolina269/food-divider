import axios from "axios";
import Select from "react-select";
import ReactModal from "react-modal";
import { useState, useEffect } from "react";
import ManageDinersModal from "./DinersModals/ManageDinersModal";
import NewDinerModal from "./DinersModals/NewDinerModal";

import "./Diners.css";

const Diners = (props) => {
  const [diners, setDiners] = useState([]);
  const [chosenDiners, setChosenDiners] = useState(
    JSON.parse(localStorage.getItem("chosenDiners")) ? JSON.parse(localStorage.getItem("chosenDiners")) : []
  );
  const [totalCalories, setTotalCalories] = useState(0);

  const [showModalManage, setShowModalManage] = useState(false);
  const [showModalNew, setShowModalNew] = useState(false);
  const gToOz = 0.0352739619;

  const getDiners = () => {
    axios.get("http://localhost:3005/diners/all").then((res) => {
      setDiners(res.data);
    });
  };

  const chooseDiners = (e) => {
    setChosenDiners(e);
    localStorage.setItem("chosenDiners", JSON.stringify(e));
  };

  useEffect(() => {
    getDiners();
  }, []);

  useEffect(() => {
    setTotalCalories(chosenDiners.reduce((acc, diner) => acc + diner.calories, 0));
  }, [chosenDiners]);

  useEffect(() => {
    if (!(Object.keys(props.chosenDish).length === 0 && props.chosenDish.constructor === Object)) {
      props.setNetWeight(props.totalWeight - props.chosenDish.weight);
    } else {
      props.setNetWeight(props.totalWeight);
    }
  }, [props.totalWeight, props.chosenDish]);

  const handleOpenModalManage = () => {
    setShowModalManage(true);
  };

  const handleCloseModalManage = () => {
    setShowModalManage(false);
  };

  const handleOpenModalNew = () => {
    setShowModalNew(true);
  };

  const handleCloseModalNew = () => {
    setShowModalNew(false);
  };

  return (
    <section className="diners">
      <h2 className="sectionTitle">Choose diners</h2>
      <section className="chooseDiners">
        <Select
          className="dinersSelection"
          isMulti
          value={chosenDiners.map((diner) => ({
            label: diner.name + " - " + diner.calories + " kcal",
            value: diner.name,
            name: diner.name,
            calories: diner.calories,
            key: diner.key,
          }))}
          options={diners.map((diner) => ({
            label: diner.name + " - " + diner.calories + " kcal",
            value: diner.name,
            name: diner.name,
            calories: diner.calories,
            key: diner._id,
          }))}
          onChange={chooseDiners}
        />
        <div className="dinersButtonsWrapper">
          <button className="btn new diner" onClick={handleOpenModalNew}>
            New diner <span>+</span>
          </button>
          <ReactModal className="modal" isOpen={showModalNew} contentLabel="New dish form">
            <button className="closeModal" onClick={handleCloseModalNew}>
              x
            </button>
            <NewDinerModal setDiners={setDiners} diners={diners} handleCloseModalNew={handleCloseModalNew} />
          </ReactModal>
          <button className="btn manage" onClick={handleOpenModalManage}>
            Manage diners
          </button>
          <ReactModal className="modal" isOpen={showModalManage} contentLabel="manage diners form">
            <button className="closeModal" onClick={handleCloseModalManage}>
              x
            </button>
            <ManageDinersModal diners={diners} />
          </ReactModal>
        </div>
      </section>
      <section className="dinersServings">
        <ul className="chosenDinersList">
          {chosenDiners.map((diner) => {
            const servingSize =
              props.unit === "g"
                ? Math.round((diner.calories / totalCalories) * props.netWeight)
                : Math.round((diner.calories / totalCalories) * props.netWeight * gToOz);
            return (
              <li key={"chosen" + diner.key}>
                {diner.name} <span>{servingSize >= 0 ? servingSize : "_"}</span>
                {props.unit}
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
};

export default Diners;
