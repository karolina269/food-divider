import { useState } from "react";
import Dishes from "../components/Dishes";
import Diners from "../components/Diners";

import "./Home.css";

const Home = () => {
  const [totalWeight, setTotalWeight] = useState(0);
  const [netWeight, setNetWeight] = useState(0);
  const [chosenDish, setChosenDish] = useState({});

  const handleWeightChange = (e) => {
    setTotalWeight(e.target.value);
  };

  return (
    <main className="home">
      <section>
        <label htmlFor="totalWeight" className="sectionTitle">
          Total weight
        </label>
        <input className="totalWeight" type="number" id="totalWeight" name="totalWeight" onChange={handleWeightChange} />
        {netWeight < 0 && (
          <p className="netWeightError" title="Change the dish or enter a higher total weight">
            Net weight is below 0
          </p>
        )}
      </section>
      <hr></hr>
      <Diners totalWeight={totalWeight} chosenDish={chosenDish} netWeight={netWeight} setNetWeight={setNetWeight} />
      <hr></hr>
      <Dishes chosenDish={chosenDish} setChosenDish={setChosenDish} />
    </main>
  );
};

export default Home;
