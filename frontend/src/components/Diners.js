import axios from "axios";
import Select from "react-select";
import ReactModal from "react-modal";
import { useState, useEffect } from "react";
import ManageDinersModal from "./dinersModals/ManageDinersModal";
import NewDinerModal from "./dinersModals/NewDinerModal";

import "./Diners.css";

const Diners = (props) => {
  const [diners, setDiners] = useState([]);
  const [showModalManage, setShowModalManage] = useState(false);
  const [showModalNew, setShowModalNew] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    setOptions(
      diners.map((diner) => ({
        label: diner.name + " - " + diner.calories + " kcal",
        value: diner.name,
        name: diner.name,
        calories: diner.calories,
        key: diner._id,
      }))
    );
    setValue(
      props.chosenDiners.map((diner) => ({
        label: diner.name + " - " + diner.calories + " kcal",
        value: diner.name,
        name: diner.name,
        calories: diner.calories,
        key: diner.key,
      }))
    );
  }, [diners, props.chosenDiners]);

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

  return (
    <section className="diners">
      <h2 className="sectionTitle">Choose diners</h2>
      <section className="chooseDiners">
        <Select
          className="dinersSelection"
          filterOption={() => true}
          isMulti
          value={value}
          options={options}
          cacheOptions={false}
          onChange={handleSelectChange}
        />

        <button className="btn manage" onClick={() => setShowModalManage(true)}>
          Manage diners
        </button>
        <ReactModal className="modal" isOpen={showModalManage} contentLabel="manage diners form">
          <ManageDinersModal
            diners={diners}
            setDiners={setDiners}
            getDiners={getDiners}
            value={value}
            setValue={setValue}
            options={options}
            setOptions={setOptions}
            setShowModalManage={setShowModalManage}
          />
        </ReactModal>
        <button className="btn new" onClick={() => setShowModalNew(true)}>
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
