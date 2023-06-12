import axios from "axios";
import Select from "react-select";
import { useState, useEffect } from "react";

import "./Diners.css";

const Diners = (props) => {
  const [diners, setDiners] = useState([]);
  const [chosenDiners, setChosenDiners] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [netWeight, setNetWeight] = useState(0);

  const getDiners = () => {
    axios.get("http://localhost:3005/eaters/all").then((res) => {
      setDiners(res.data);
    });
  };

  const chooseDiners = (e) => {
    setChosenDiners(e);
  };

  useEffect(() => {
    getDiners();
  }, []);

  useEffect(() => {
    setTotalCalories(chosenDiners.reduce((acc, diner) => acc + diner.calories, 0));
  }, [chosenDiners]);

  //czy to jest potrzebne, skoro zależności są w propsach?
  useEffect(() => {
    setNetWeight(props.totalWeight - props.chosenDish.weight);
  }, [props.totalWeight, props.chosenDish.weight]);

  return (
    <section className="diners">
      <h2 className="sectionTitle">Choose diners</h2>
      <Select
        className="dinersSelection"
        isMulti
        options={diners.map((diner) => ({
          label: diner.name + " - " + diner.calories + " kcal",
          value: diner.name,
          name: diner.name,
          calories: diner.calories,
          key: diner._id,
        }))}
        onChange={chooseDiners}
      />
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
