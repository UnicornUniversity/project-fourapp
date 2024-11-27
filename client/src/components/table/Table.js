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
          <th>
            <input type="checkbox" className="selectAll" />
          </th>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          {renderAction && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>
              <input type="checkbox" />
            </td>
            {columnKeys.map((key, keyIndex) => {
              if (key === "sizes") {
                return (
                  <td key={keyIndex}>
                    {row[key].map((size) => (
                      <span key={size} className="size-badge">
                        {size}
                      </span>
                    ))}
                  </td>
                );
              }
              return <td key={keyIndex}>{row[key]}</td>;
            })}
            {renderAction && (
              <td className="tableAction">{renderAction(rowIndex)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
