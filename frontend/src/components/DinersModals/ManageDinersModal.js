import { useState } from "react";
import axios from "axios";

const ManageDinersModal = (props) => {
  const [isDisabled, setIsDisabled] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    calories: "",
  });

  const handleInputChange = (e, index) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const editDiner = (e) => {
    console.log(e.target.key);
    //   console.log("edytuje zjadacza o id:");
    //   axios.post("http://localhost:3005/diners/edit/" + e.target.key, formData).then(() => {
    //      console.log("zedytuj zjadacza jeszcze we froncie")
    //   });
  };

  const enableEdit = (e) => {
    console.log(e.target);
  };

  return (
    <section className="manageDiners">
      {props.diners.map((diner, index) => {
        const newDisabled = isDisabled.concat(true);
        // setIsDisabled(isDisabled.concat(true));
        console.log(diner._id);
        // return (
        //   <form key={diner._id} noValidate onSubmit={editDiner}>
        //     {isDisabled[index]}
        //     <div className="outerInputsWrapper">
        //       <div className="inputWrapper">
        //         <label htmlFor="name">Name:</label>
        //         <input type="text" name="name" defaultValue={diner.name} onChange={handleInputChange} disabled={isDisabled[index]} />
        //       </div>
        //       <div className="inputWrapper">
        //         <label htmlFor="calories">Calories:</label>
        //         <input type="number" name="calories" defaultValue={diner.calories} onChange={handleInputChange} disabled={isDisabled[index]} />
        //       </div>
        //     </div>
        //     <button type="button" className="btn" onClick={enableEdit}>
        //       Edit
        //     </button>
        //     <button type="submit" className="btn" disabled={isDisabled[index]}>
        //       Save
        //     </button>
        //   </form>
        // );
      })}
    </section>
  );
};

export default ManageDinersModal;
