import "./../../assets/styles/global.css";

function Table({ children, className = "", ...props }) {
  return (
    <table className={`table ${className}`} {...props}>
      {children}
    </table>
  );
}

export default Table;
