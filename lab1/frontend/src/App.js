import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DragonsPage from './pages/DragonsPage';
import SpecialOperationsPage from './pages/SpecialOperations';

import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DragonsPage />} />
          <Route path="/special-operations" element={<SpecialOperationsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;