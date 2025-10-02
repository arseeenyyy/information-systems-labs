import React, { useState } from 'react';
import Header from '../components/common/Header';
import { dragonService } from '../services/api';
import '../styles/specialOperations.css';

function SpecialOperationsPage() {
  const [color, setColor] = useState('');
  const [substring, setSubstring] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDeleteAllByColor = async () => {
    if (!color) return;
    
    setLoading(true);
    try {
      await dragonService.deleteAllByColor(color);
      setColor('');
      setResults([]);
    } catch (error) {
      // Игнорируем ошибки
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOneByColor = async () => {
    if (!color) return;
    
    setLoading(true);
    try {
      await dragonService.deleteOneByColor(color);
      setColor('');
      setResults([]);
    } catch (error) {
      // Игнорируем ошибки
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByName = async () => {
    if (!substring.trim()) return;
    
    setLoading(true);
    try {
      const dragons = await dragonService.findByNameStartingWith(substring);
      setResults(dragons);
    } catch (error) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="special-operations-page">
      <Header />
      <div className="operations-container">
        <div className="operations-header">
          <h1 className="operations-title">Special Operations</h1>
          <p className="operations-subtitle">Perform special operations on dragons</p>
        </div>

        <div className="operations-grid">
          {/* Color Operations */}
          <div className="operation-card">
            <h3 className="operation-title">Delete Dragons by Color</h3>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="operation-input"
              disabled={loading}
            >
              <option value="">Select Color</option>
              <option value="GREEN">GREEN</option>
              <option value="BLUE">BLUE</option>
              <option value="YELLOW">YELLOW</option>
            </select>
            <div className="operation-buttons">
              <button
                onClick={handleDeleteAllByColor}
                className={`btn-delete-all ${(loading || !color) ? 'btn-disabled' : ''}`}
                disabled={loading || !color}
              >
                {loading ? 'Deleting...' : 'Delete All'}
              </button>
              <button
                onClick={handleDeleteOneByColor}
                className={`btn-delete-one ${(loading || !color) ? 'btn-disabled' : ''}`}
                disabled={loading || !color}
              >
                {loading ? 'Deleting...' : 'Delete One'}
              </button>
            </div>
          </div>

          {/* Search Operation */}
          <div className="operation-card">
            <h3 className="operation-title">Search Dragons by Name</h3>
            <input
              type="text"
              value={substring}
              onChange={(e) => setSubstring(e.target.value)}
              className="operation-input"
              placeholder="Enter name starting with..."
              disabled={loading}
            />
            <div className="operation-buttons">
              <button
                onClick={handleSearchByName}
                className={`btn-search ${(loading || !substring.trim()) ? 'btn-disabled' : ''}`}
                disabled={loading || !substring.trim()}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>

            {/* Results Display - просто показываем список без заголовка */}
            {results.length > 0 && (
              <div className="results-list">
                {results.map(dragon => (
                  <div key={dragon.id} className="result-item">
                    <span className="dragon-name">{dragon.name}</span>
                    <span className="dragon-details">
                      (Age: {dragon.age}, Weight: {dragon.weight}kg, Color: {dragon.color || 'None'})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialOperationsPage;