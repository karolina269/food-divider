import { gToOz, ozToG } from "../views/Home";
import "./TotalWeight.css";

const TotalWeight = (props) => {
  const selectUnit = (e) => {
    props.setUnit(e.target.value);
    if (e.target.value === "oz") {
      props.setTotalWeight(Math.round(props.totalWeight * gToOz * 100) / 100);
    } else {
      props.setTotalWeight(Math.round(props.totalWeight * ozToG * 100) / 100);
    }
  };

  const handleWeightChange = (e) => {
    props.setTotalWeight(e.target.value);
  };

  return (
    <section className="totalWeightSection">
      <label htmlFor="totalWeight" className="sectionTitle">
        Total weight
      </label>
      {props.netWeight < 0 && (
        <p className="netWeightError" title="Change the dish or enter a higher total weight">
          Net weight is below 0
        </p>
      )}
      <div className="valueWrapper">
        <input
          className="totalWeight"
          type="number"
          id="totalWeight"
          name="totalWeight"
          value={props.totalWeight}
          onChange={handleWeightChange}
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
