import { useState } from "react";
import Servings from "../components/Servings";
import TotalWeight from "../components/TotalWeight";
import Dishes from "../components/Dishes";
import Diners from "../components/Diners";

import "./Home.css";

export const gToOz = 0.0352739619;
export const ozToG = 28.3495231;

const Home = (props) => {
  const [totalWeight, setTotalWeight] = useState(0);
  const [netWeight, setNetWeight] = useState(0);
  const [chosenDish, setChosenDish] = useState({});
  const [chosenDiners, setChosenDiners] = useState(
    JSON.parse(localStorage.getItem("chosenDiners")) ? JSON.parse(localStorage.getItem("chosenDiners")) : []
  );
  const [unit, setUnit] = useState("g");

  return (
    <main className="home">
      <Servings
        totalWeight={totalWeight}
        netWeight={netWeight}
        setNetWeight={setNetWeight}
        unit={unit}
        chosenDish={chosenDish}
        chosenDiners={chosenDiners}
      />
      <hr></hr>
      <TotalWeight totalWeight={totalWeight} setTotalWeight={setTotalWeight} unit={unit} setUnit={setUnit} />
      <hr></hr>
      <Diners chosenDish={chosenDish} setChosenDiners={setChosenDiners} chosenDiners={chosenDiners} />
      <hr></hr>
      <Dishes chosenDish={chosenDish} setChosenDish={setChosenDish} unit={unit} />
    </main>
  );
};

export default Home;
