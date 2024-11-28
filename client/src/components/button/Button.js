import "./../../assets/styles/global.css";

function Button({ className = "", buttonText }) {
    return (
        <div className="buttonWrapper">
            <button className={`button ${className}`}>
                {buttonText}
            </button>
        </div>
    );
}

export default Button;
