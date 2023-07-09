import axios from "axios";
import Select from "react-select";
import ReactModal from "react-modal";
import { useState, useEffect, useRef } from "react";
import ManageDinersModal from "./dinersModals/ManageDinersModal";
import NewDinerModal from "./dinersModals/NewDinerModal";

import "./Diners.css";

const Diners = (props) => {
  const [diners, setDiners] = useState([]);
  const [showModalManage, setShowModalManage] = useState(false);
  const [showModalNew, setShowModalNew] = useState(false);

  const getDiners = () => {
    axios.get("http://localhost:3005/diners/all").then((res) => {
      setDiners(res.data);
    });
  };

  const handleSelectChange = (selectedOption) => {
    props.setChosenDiners(selectedOption);
    localStorage.setItem("chosenDiners", JSON.stringify(selectedOption));
  };

  useEffect(() => {
    getDiners();
  }, []);

  const handleCloseModalNew = () => {
    setShowModalNew(false);
  };

  useEffect(() => {
    localStorage.setItem("chosenDiners", JSON.stringify(props.chosenDiners));
  }, [props.chosenDiners]);

  const selectRef = useRef(null);

  return (
    <section className="diners">
      <h2 className="sectionTitle">Choose diners</h2>
      <section className="chooseDiners">
        <Select
          ref={selectRef}
          className="dinersSelection"
          isMulti
          value={props.chosenDiners.map((diner) => ({
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
          onChange={handleSelectChange}
        />

        <button className="btn manage" onClick={() => setShowModalManage(true)}>
          Manage diners
        </button>
        <ReactModal className="modal" isOpen={showModalManage} contentLabel="manage diners form">
          <ManageDinersModal
            diners={diners}
            setDiners={setDiners}
            chosenDiners={props.chosenDiners}
            setChosenDiners={props.setChosenDiners}
            setShowModalManage={setShowModalManage}
          />
        </ReactModal>
        <button className="btn new" onClick={() => setShowModalNew(true)}>
          New diner <span>+</span>
        </button>
        <ReactModal className="modal" isOpen={showModalNew} contentLabel="New diner form">
          <NewDinerModal
            setDiners={setDiners}
            diners={diners}
            chosenDiners={props.chosenDiners}
            setChosenDiners={props.setChosenDiners}
            handleCloseModalNew={handleCloseModalNew}
          />
        </ReactModal>
      </section>
    </section>
  );
};

export default Diners;
