import axios from "axios";
import Select from "react-select";
import ReactModal from "react-modal";
import { useState, useEffect } from "react";
import ManageDinersModal from "./DinersModals/ManageDinersModal";
import NewDinerModal from "./DinersModals/NewDinerModal";

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

  const chooseDiners = (e) => {
    props.setChosenDiners(e);
    localStorage.setItem("chosenDiners", JSON.stringify(e));
  };

  useEffect(() => {
    getDiners();
  }, []);

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
          onChange={chooseDiners}
        />
        <button className="btn manage" onClick={handleOpenModalManage}>
          Manage diners
        </button>
        <ReactModal className="modal" isOpen={showModalManage} contentLabel="manage diners form">
          <button className="closeModal" onClick={handleCloseModalManage}>
            x
          </button>
          <ManageDinersModal diners={diners} setDiners={setDiners} />
        </ReactModal>
        <button className="btn new" onClick={handleOpenModalNew}>
          New diner <span>+</span>
        </button>
        <ReactModal className="modal" isOpen={showModalNew} contentLabel="New dish form">
          <button className="closeModal" onClick={handleCloseModalNew}>
            x
          </button>
          <NewDinerModal setDiners={setDiners} diners={diners} handleCloseModalNew={handleCloseModalNew} />
        </ReactModal>
      </section>
    </section>
  );
};

export default Diners;
