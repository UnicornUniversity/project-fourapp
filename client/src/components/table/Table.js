import React from "react";
import "./../../assets/styles/global.css";

function Table({
  headers,
  data,
  columnKeys,
  renderAction,
  className = "",
  ...props
}) {
  return (
    <table className={`table ${className}`} {...props}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          {renderAction && <th className="tableAction">Action</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columnKeys.map((key, keyIndex) => {
              if (key === "sizes") {
                return (
                  <td key={keyIndex}>
                    {row[key].map((size, keyIndex) => (
                      <span key={keyIndex} className="size-badge">
                        {size}
                      </span>
                    ))}
                  </td>
                );
              }
              return <td key={keyIndex}>{row[key]}</td>;
            })}
            {renderAction && (
              <td className="tableAction">{renderAction(row._id)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
