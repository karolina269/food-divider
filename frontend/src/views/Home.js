import { useState } from "react";
import Dishes from "../components/Dishes";
import Diners from "../components/Diners";

import "./Home.css";

const Home = (props) => {
  const [totalWeight, setTotalWeight] = useState(0);
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
      </section>
      <hr></hr>
      <Diners user={props.user} totalWeight={totalWeight} chosenDish={chosenDish} />
      <hr></hr>
      <Dishes user={props.user} chosenDish={chosenDish} setChosenDish={setChosenDish} />
    </main>
  );
};

export default Home;
