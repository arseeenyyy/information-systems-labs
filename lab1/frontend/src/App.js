import React, { useState } from 'react';
import Navigation from './components/navigation/Navigation';
import DragonsPage from './pages/DragonsPage';
import RelatedObjectsPage from './pages/RelatedObjectsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('dragons');

  const renderPage = () => {
    switch (currentPage) {
      case 'dragons': return <DragonsPage />;
      case 'related': return <RelatedObjectsPage />;
      default: return <DragonsPage />;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;