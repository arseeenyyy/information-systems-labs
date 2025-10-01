import React from 'react';

function Navigation({ currentPage, onPageChange }) {
  return (
    <div style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
      <button 
        onClick={() => onPageChange('dragons')}
        style={{ 
          marginRight: '10px',
          fontWeight: currentPage === 'dragons' ? 'bold' : 'normal',
          padding: '8px 16px'
        }}
      >
        Dragons
      </button>
      <button 
        onClick={() => onPageChange('related')}
        style={{ 
          fontWeight: currentPage === 'related' ? 'bold' : 'normal',
          padding: '8px 16px'
        }}
      >
        Related Objects
      </button>
    </div>
  );
}

export default Navigation;