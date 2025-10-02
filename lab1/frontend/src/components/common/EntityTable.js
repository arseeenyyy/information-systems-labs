import React from 'react';

function EntityTable({ columns, data, onRowClick }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            {columns.map((column, index) => (
              <th key={index} style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '2px solid #dee2e6',
                fontWeight: '600',
                color: '#495057'
              }}>
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
              style={{
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background-color 0.2s',
                borderBottom: '1px solid #dee2e6'
              }}
              onMouseEnter={(e) => {
                if (onRowClick) e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                if (onRowClick) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  {column.render ? column.render(item[column.key], item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#6c757d',
          backgroundColor: 'white'
        }}>
          No data available
        </div>
      )}
    </div>
  );
}

export default EntityTable;