import React from 'react';
import '../../styles/entityTable.css';

function EntityTable({ columns, data, onRowClick, emptyMessage = "No data available" }) {
  return (
    <div className="table-container">
      <table className="entity-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={item.id}
              onClick={() => onRowClick && onRowClick(item)}
              className={onRowClick ? 'clickable' : ''}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.render ? column.render(item[column.key], item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="table-empty">
          {emptyMessage}
        </div>
      )}
    </div>
  );
}

export default EntityTable;