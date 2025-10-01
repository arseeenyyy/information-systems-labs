import React from 'react';

function EntityTable({ columns, data, onEdit, onDelete, onRowClick }) {
  return (
    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key}>{col.title}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} onClick={() => onRowClick && onRowClick(item)} style={{ cursor: onRowClick ? 'pointer' : 'default' }}>
            {columns.map(col => (
              <td key={col.key}>{item[col.key]}</td>
            ))}
            <td>
              <button onClick={(e) => { e.stopPropagation(); onEdit(item); }}>Edit</button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EntityTable;