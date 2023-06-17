import { useState } from "react";
import Dishes from "../components/Dishes";
import Diners from "../components/Diners";

import "./Home.css";

const Home = (props) => {
  const [totalWeight, setTotalWeight] = useState(0);
  const [netWeight, setNetWeight] = useState(0);
  const [chosenDish, setChosenDish] = useState({});
  const gToOz = 0.0352739619;

  const handleWeightChange = (e) => {
    props.unit === "g" ? setTotalWeight(e.target.value) : setTotalWeight(e.target.value * gToOz);
  };

  return (
    <main className="home">
      <section className="weight">
        <label htmlFor="totalWeight" className="sectionTitle">
          Total weight
        </label>
        <div className="totalWeightWrapper">
          <input className="totalWeight" type="number" id="totalWeight" name="totalWeight" onChange={handleWeightChange} />
          {props.unit}
          {netWeight < 0 && (
            <p className="netWeightError" title="Change the dish or enter a higher total weight">
              Net weight is below 0
            </p>
          )}
        </div>
      </section>
      <hr></hr>
      <Diners totalWeight={totalWeight} chosenDish={chosenDish} netWeight={netWeight} setNetWeight={setNetWeight} unit={props.unit} />
      <hr></hr>
      <Dishes chosenDish={chosenDish} setChosenDish={setChosenDish} unit={props.unit} />
    </main>
  );
};

export default Home;
