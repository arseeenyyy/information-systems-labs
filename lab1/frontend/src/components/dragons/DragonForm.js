import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

function DragonForm({ isOpen, onClose, dragon, onSave }) {
  const [formData, setFormData] = useState({
    name: '', age: '', weight: '', color: '', character: '',
    coordinates: null, cave: null, killer: null, head: null
  });

  const [relatedObjects, setRelatedObjects] = useState({
    caves: [],
    persons: [],
    heads: [],
    coordinates: []
  });

  useEffect(() => {
    // Заглушка - имитируем загрузку связанных объектов
    setRelatedObjects({
      caves: [
        { id: 1, numberOfTreasures: 100 },
        { id: 2, numberOfTreasures: 500 }
      ],
      persons: [
        { id: 1, name: 'Arthur' },
        { id: 2, name: 'Lancelot' }
      ],
      heads: [
        { id: 1, size: 50, eyesCount: 2 },
        { id: 2, size: 75, eyesCount: 3 }
      ],
      coordinates: [
        { id: 1, x: 100, y: 200 },
        { id: 2, x: 300, y: 400 }
      ]
    });

    if (dragon) {
      setFormData(dragon);
    } else {
      setFormData({
        name: '', age: '', weight: '', color: '', character: '',
        coordinates: null, cave: null, killer: null, head: null
      });
    }
  }, [dragon, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRelatedChange = (type, id) => {
    const obj = relatedObjects[type].find(item => item.id == id);
    handleChange(type, obj || null);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={dragon ? 'Edit Dragon' : 'Create New Dragon'}
    >
      <form onSubmit={handleSubmit}>
        {/* Основные поля */}
        <div style={{ marginBottom: '10px' }}>
          <label>Name: </label>
          <input 
            value={formData.name} 
            onChange={e => handleChange('name', e.target.value)}
            required 
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Age: </label>
          <input 
            type="number"
            value={formData.age} 
            onChange={e => handleChange('age', parseInt(e.target.value))}
            required 
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Weight: </label>
          <input 
            type="number"
            step="0.1"
            value={formData.weight} 
            onChange={e => handleChange('weight', parseFloat(e.target.value))}
            required 
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Color: </label>
          <select 
            value={formData.color} 
            onChange={e => handleChange('color', e.target.value)}
          >
            <option value="">Select Color</option>
            <option value="GREEN">GREEN</option>
            <option value="BLUE">BLUE</option>
            <option value="YELLOW">YELLOW</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Character: </label>
          <select 
            value={formData.character} 
            onChange={e => handleChange('character', e.target.value)}
          >
            <option value="">Select Character</option>
            <option value="EVIL">EVIL</option>
            <option value="CHAOTIC">CHAOTIC</option>
            <option value="CHAOTIC_EVIL">CHAOTIC_EVIL</option>
          </select>
        </div>

        {/* Связанные объекты */}
        <h4>Related Objects</h4>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Coordinates: </label>
          <select 
            value={formData.coordinates?.id || ''} 
            onChange={e => handleRelatedChange('coordinates', e.target.value)}
          >
            <option value="">No Coordinates</option>
            {relatedObjects.coordinates.map(coord => (
              <option key={coord.id} value={coord.id}>
                ({coord.x}, {coord.y})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Cave: </label>
          <select 
            value={formData.cave?.id || ''} 
            onChange={e => handleRelatedChange('cave', e.target.value)}
          >
            <option value="">No Cave</option>
            {relatedObjects.caves.map(cave => (
              <option key={cave.id} value={cave.id}>
                Cave #{cave.id} ({cave.numberOfTreasures} treasures)
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Killer: </label>
          <select 
            value={formData.killer?.id || ''} 
            onChange={e => handleRelatedChange('killer', e.target.value)}
          >
            <option value="">No Killer</option>
            {relatedObjects.persons.map(person => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Head: </label>
          <select 
            value={formData.head?.id || ''} 
            onChange={e => handleRelatedChange('head', e.target.value)}
          >
            <option value="">No Head</option>
            {relatedObjects.heads.map(head => (
              <option key={head.id} value={head.id}>
                Size: {head.size}, Eyes: {head.eyesCount}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

export default DragonForm;