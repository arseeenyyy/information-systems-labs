import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div style={{ marginTop: '10px' }}>
      <button 
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      
      <span style={{ margin: '0 10px' }}> 
        Page {currentPage + 1} of {totalPages} 
      </span>
      
      <button 
        disabled={currentPage >= totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;