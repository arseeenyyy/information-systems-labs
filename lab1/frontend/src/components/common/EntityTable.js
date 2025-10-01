import React from 'react';

function EntityTable({ columns, data, onRowClick }) {
  return (
    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key} style={{ padding: '8px', textAlign: 'left' }}>
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr 
            key={item.id} 
            onClick={() => onRowClick && onRowClick(item)}
            style={{ 
              cursor: onRowClick ? 'pointer' : 'default',
              backgroundColor: onRowClick ? '#f5f5f5' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (onRowClick) e.currentTarget.style.backgroundColor = '#e9e9e9';
            }}
            onMouseLeave={(e) => {
              if (onRowClick) e.currentTarget.style.backgroundColor = '#f5f5f5';
            }}
          >
            {columns.map(col => (
              <td key={col.key} style={{ padding: '8px' }}>
                {col.render ? col.render(item[col.key]) : item[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EntityTable;