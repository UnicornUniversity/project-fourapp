import "./../../assets/styles/global.css";

function Button({ onClick, className = "", buttonText, children }) {
    return (
        <div className="buttonWrapper">
            <div className={`button ${className}`} onClick={onClick}>
                {children}
                <div>
                    {buttonText}
                </div>
            </div>
        </div>

    );
}

export default Button;
