import { gToOz, ozToG } from "../views/Home";
import { Tooltip } from "react-tooltip";
import "./TotalWeight.css";
import { useRef, useState } from "react";

const TotalWeight = (props) => {
  const [totalWeightRounded, setTotalWeightRounded] = useState(0);

  const totalWeightInput = useRef(null);

  const selectUnit = (e) => {
    totalWeightInput.current.focus();
    setTimeout(() => totalWeightInput.current.select(), 0);

    props.setUnit(e.target.value);
    if (e.target.value === "oz") {
      setTotalWeightRounded(Math.round(props.totalWeight * gToOz * 100) / 100);
      props.setTotalWeight(props.totalWeight * gToOz);
    }
    if (e.target.value === "g") {
      setTotalWeightRounded(Math.round(props.totalWeight * ozToG * 10) / 10);
      props.setTotalWeight(props.totalWeight * ozToG);
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
          ref={totalWeightInput}
          className="totalWeight"
          type="number"
          id="totalWeight"
          name="totalWeight"
          value={totalWeightRounded}
          onChange={(e) => {
            props.setTotalWeight(e.target.value);
            setTotalWeightRounded(e.target.value);
          }}
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
