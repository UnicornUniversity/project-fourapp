import "./../../assets/styles/global.css";

function Checkbox({ value, title = "" }) {
  return (
    <div className="checkboxWrapper">
      <div>
        <input
          type="checkbox"
          id="cbx"
          className="hidden-xs-up"
          checked={value}
        />
        <label for="cbx" className="cbx"></label>
      </div>
      <p>{title}</p>
    </div>
  );
}

export default Checkbox;
