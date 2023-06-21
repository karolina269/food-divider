import { useState, useEffect } from "react";
import { gToOz } from "../views/Home";

import "./Servings.css";

const Servings = (props) => {
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    setTotalCalories(props.chosenDiners.reduce((acc, diner) => acc + diner.calories, 0));
  }, [props.chosenDiners]);

  useEffect(() => {
    if (!(Object.keys(props.chosenDish).length === 0 && props.chosenDish.constructor === Object)) {
      props.unit === "g"
        ? props.setNetWeight(props.totalWeight - props.chosenDish.weight)
        : props.setNetWeight(props.totalWeight - props.chosenDish.weight * gToOz);
    } else {
      props.setNetWeight(props.totalWeight);
    }
  }, [props]);

  return (
    <section className="servings">
      <h2 className="sectionTitle">Servings</h2>
      {!props.chosenDiners.length && <p>Choose diners to get calculated serving sizes</p>}
      {props.chosenDiners.map((diner) => {
        let servingSize = 0;
        if (props.unit === "g") {
          servingSize = Math.round((diner.calories / totalCalories) * props.netWeight);
        } else {
          servingSize = Math.round((diner.calories / totalCalories) * props.netWeight * 100) / 100;
        }
        return (
          <div className="diner" key={"chosen" + diner.key}>
            {diner.name}: {servingSize >= 0 ? servingSize : "_"} {props.unit}
          </div>
        );
      })}
    </section>
  );
};

export default Servings;
