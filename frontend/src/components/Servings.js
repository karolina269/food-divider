import { useState, useEffect } from "react";
import { gToOz } from "../views/Home";
import { Tooltip } from "react-tooltip";

import "./Servings.css";

const Servings = (props) => {
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    setTotalCalories(props.chosenDiners.reduce((acc, diner) => acc + diner.calories, 0));
  }, [props.chosenDiners]);

  useEffect(() => {
    if (props.chosenDish) {
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
          <div
            className="diner"
            key={"chosen" + diner.key}
            data-tooltip-id="dinerServing"
            data-tooltip-content="Net weight is below 0"
            data-tooltip-place="top">
            {diner.name}: {servingSize >= 0 ? servingSize : "_"} {props.unit}
            {servingSize < 0 && <Tooltip id="dinerServing" />}
          </div>
        );
      })}
    </section>
  );
};

export default Servings;
