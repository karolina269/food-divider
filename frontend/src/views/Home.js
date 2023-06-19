import { useState } from "react";
import Dishes from "../components/Dishes";
import Diners from "../components/Diners";

import "./Home.css";

export const gToOz = 0.0352739619;
export const ozToG = 28.3495231;

const Home = (props) => {
  const [totalWeight, setTotalWeight] = useState(0);
  const [netWeight, setNetWeight] = useState(0);
  const [chosenDish, setChosenDish] = useState({});
  const [unit, setUnit] = useState("g");

  const selectUnit = (e) => {
    setUnit(e.target.value);
    e.target.value === "oz" ? setTotalWeight(Math.round(totalWeight * gToOz * 100) / 100) : setTotalWeight(Math.round(totalWeight * ozToG * 100) / 100);
  };

  const handleWeightChange = (e) => {
    unit === "g" ? setTotalWeight(e.target.value) : setTotalWeight(e.target.value * gToOz);
  };

  return (
    <main className="home">
      <section className="weight">
        <label htmlFor="totalWeight" className="sectionTitle">
          Total weight
        </label>
        <div className="totalWeightWrapper">
          <input className="totalWeight" type="number" id="totalWeight" name="totalWeight" value={totalWeight} onChange={handleWeightChange} />
          <select className="unit" onChange={selectUnit}>
            <option value="g">g</option>
            <option value="oz">oz</option>
          </select>
          {netWeight < 0 && (
            <p className="netWeightError" title="Change the dish or enter a higher total weight">
              Net weight is below 0
            </p>
          )}
        </div>
      </section>
      <hr></hr>
      <Diners totalWeight={totalWeight} chosenDish={chosenDish} netWeight={netWeight} setNetWeight={setNetWeight} unit={unit} />
      <hr></hr>
      <Dishes chosenDish={chosenDish} setChosenDish={setChosenDish} unit={unit} />
    </main>
  );
};

export default Home;
