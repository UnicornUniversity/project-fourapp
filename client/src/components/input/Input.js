import "./../../assets/styles/global.css";

function Input({
  className = "",
  type,
  placeholder,
  disabled = false,
  id,
  name,
  value,
  children,
  errorMessage,
  checked,
  onChange,
  multiple,
}) {
  return (
    <div className="inputWrapper">
      {children}
      <input
        className={`input ${className} ${errorMessage ? "inputError" : ""}`} // Add 'inputError' if errorMessage exists
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        multiple={multiple}
      ></input>
      {errorMessage && (
        <div className="tooltipError">
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

export default Input;
