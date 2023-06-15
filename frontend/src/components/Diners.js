import axios from "axios";
import Select from "react-select";
import ReactModal from "react-modal";
import { useState, useEffect } from "react";
import ManageDinersModal from "./ManageDinersModal";
import NewDinerModal from "./NewDinerModal";

import "./Diners.css";

const Diners = (props) => {
  const [diners, setDiners] = useState([]);
  const [chosenDiners, setChosenDiners] = useState(
    JSON.parse(localStorage.getItem("chosenDiners")) ? JSON.parse(localStorage.getItem("chosenDiners")) : []
  );
  const [totalCalories, setTotalCalories] = useState(0);
  const [netWeight, setNetWeight] = useState(0);
  const [showModalManage, setShowModalManage] = useState(false);
  const [showModalNew, setShowModalNew] = useState(false);

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
      setNetWeight(props.totalWeight - props.chosenDish.weight);
    } else {
      setNetWeight(props.totalWeight);
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
      <section className="chooseDiners">
        <h2 className="sectionTitle">Choose diners</h2>
        <Select
          className="dinersSelection"
          isMulti
          value={chosenDiners.map((diner) => ({
            label: diner.name + " - " + diner.calories + " kcal",
            value: diner.name,
            name: diner.name,
            calories: diner.calories,
            key: "chosen" + diner._id,
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
            <ManageDinersModal />
          </ReactModal>
        </div>
      </section>
      <section className="dinersServings">
        <ul className="chosenDinersList">
          {chosenDiners.map((diner) => {
            const servingSize = Math.round((diner.calories / totalCalories) * netWeight);
            return (
              <li key={"chosen" + diner.key}>
                {diner.name} <span>{servingSize}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
};

export default Diners;
