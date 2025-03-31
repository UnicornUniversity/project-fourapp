import "./../../assets/styles/global.css";

function Checkbox({ value, title = "", onChange }) {
  return (
    <div className="checkboxWrapper" onChange={onChange}>
      <div>
        <input
          type="checkbox"
          id="cbx"
          className="hidden-xs-up"
          checked={value}
        />
        <label htmlFor="cbx" className="cbx"></label>
      </div>
      <p>{title}</p>
    </div>
  );
}

export default Checkbox;
