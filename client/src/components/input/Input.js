import "./../../assets/styles/global.css";

function Input({ className = "", type, placeholder, required = false, disabled = false, id, name, value }) {
    return (
        <div className="inputWrapper">
            <input className={`input ${className}`} type={type} placeholder={placeholder} required={required} disabled={disabled} id={id} name={name} value={value}>
            </input>
        </div>
    );
}

export default Input;
