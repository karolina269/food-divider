import "./FormPicker.css";

const FormPicker = (props) => {
  return (
    <form className="formPicker">
      <div className="radioWrapper">
        <input name="formPicker" type="radio" id="signup" value="signup" onChange={props.switchForm} defaultChecked />
      </div>
      <label htmlFor="signup">Sign up</label>

      <div className="radioWrapper">
        <input name="formPicker" type="radio" id="login" value="login" onChange={props.switchForm} />
      </div>
      <label htmlFor="login">Log in</label>
    </form>
  );
};
export default FormPicker;
