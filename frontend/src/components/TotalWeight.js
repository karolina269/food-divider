import { useState } from "react";
import { gToOz, ozToG } from "../views/Home";
import { Tooltip } from "react-tooltip";
import "./TotalWeight.css";

const TotalWeight = (props) => {
  const [totalWeightGrams, setTotalWeightGrams] = useState(0);
  const selectUnit = (e) => {
    props.setUnit(e.target.value);
    if (e.target.value === "oz") {
      setTotalWeightGrams(props.totalWeight);
      props.setTotalWeight(Math.round(props.totalWeight * gToOz * 100) / 100);
    } else {
      if (totalWeightGrams) {
        props.setTotalWeight(totalWeightGrams);
      } else {
        props.setTotalWeight(Math.round(props.totalWeight * ozToG * 100) / 100);
      }
    }
  };

  return (
    <section className="totalWeightSection">
      <label htmlFor="totalWeight" className="sectionTitle">
        Total weight
      </label>
      {props.netWeight < 0 && (
        <>
          <p
            className="netWeightError"
            data-tooltip-id="netWeightErrorTooltip"
            data-tooltip-content="Change the dish or enter a higher total weight"
            data-tooltip-place="top">
            Net weight is below 0
          </p>
          <Tooltip id="netWeightErrorTooltip" />
        </>
      )}
      <div className="valueWrapper">
        <input
          className="totalWeight"
          type="number"
          id="totalWeight"
          name="totalWeight"
          value={props.totalWeight}
          onChange={(e) => props.setTotalWeight(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
        <select className="unit" onChange={selectUnit}>
          <option value="g">g</option>
          <option value="oz">oz</option>
        </select>
      </div>
    </section>
  );
};
export default TotalWeight;
