import "./../../assets/styles/global.css";

function Card({ children, className = "", onClick, ...props }) {
  return (
    <div className={`card ${className}`} {...props} onClick={onClick}>
      {children}
    </div>
  );
}

export default Card;
