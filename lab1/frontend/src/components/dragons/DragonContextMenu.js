import React from 'react';

function DragonContextMenu({ x, y, dragon, onEdit, onDelete, onView, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 999
        }}
        onClick={onClose}
      />
      
      {/* Context Menu */}
      <div style={{
        position: 'fixed',
        left: x,
        top: y,
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
        minWidth: '150px'
      }}>
        <div style={{ padding: '5px 0' }}>
          <button 
            style={{ 
              display: 'block', 
              width: '100%', 
              textAlign: 'left', 
              padding: '8px 12px', 
              border: 'none', 
              background: 'none',
              cursor: 'pointer'
            }}
            onClick={onView}
          >
            View Details
          </button>
          <button 
            style={{ 
              display: 'block', 
              width: '100%', 
              textAlign: 'left', 
              padding: '8px 12px', 
              border: 'none', 
              background: 'none',
              cursor: 'pointer'
            }}
            onClick={onEdit}
          >
            Edit Dragon
          </button>
          <button 
            style={{ 
              display: 'block', 
              width: '100%', 
              textAlign: 'left', 
              padding: '8px 12px', 
              border: 'none', 
              background: 'none',
              cursor: 'pointer',
              color: 'red'
            }}
            onClick={onDelete}
          >
            Delete Dragon
          </button>
        </div>
      </div>
    </>
  );
}

export default DragonContextMenu;