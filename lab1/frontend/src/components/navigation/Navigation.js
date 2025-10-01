import React from 'react';

function Navigation({ currentPage, onPageChange }) {
  return (
    <div style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
      <button 
        onClick={() => onPageChange('dragons')}
        style={{ fontWeight: currentPage === 'dragons' ? 'bold' : 'normal' }}
      >
        Dragons
      </button>
      <button 
        onClick={() => onPageChange('related')}
        style={{ fontWeight: currentPage === 'related' ? 'bold' : 'normal' }}
      >
        Related Objects
      </button>
    </div>
  );
}

export default Navigation;