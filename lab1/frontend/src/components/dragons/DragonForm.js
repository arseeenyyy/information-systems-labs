import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

function DragonForm({ isOpen, onClose, dragon, onSave, existingObjects }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    color: '',
    character: '',
    coordinates: null,
    cave: null,
    killer: null,
    head: null
  });

  const [errors, setErrors] = useState({});
  const [availableObjects, setAvailableObjects] = useState({
    coordinates: [],
    caves: [],
    persons: [],
    heads: []
  });

  useEffect(() => {
    if (existingObjects) {
      setAvailableObjects(existingObjects);
    } else {
      // Mock данные для демонстрации
      setAvailableObjects({
        coordinates: [
          { id: 1, x: 100, y: 200 },
          { id: 2, x: 300, y: 400 }
        ],
        caves: [
          { id: 1, numberOfTreasures: 1000 },
          { id: 2, numberOfTreasures: 500 }
        ],
        persons: [
          { id: 1, name: 'Arthur', eyeColor: 'BLUE', height: 180 },
          { id: 2, name: 'Lancelot', eyeColor: 'GREEN', height: 185 }
        ],
        heads: [
          { id: 1, size: 50, eyesCount: 2 },
          { id: 2, size: 75, eyesCount: 3 }
        ]
      });
    }
  }, [existingObjects]);

  useEffect(() => {
    if (dragon) {
      setFormData(dragon);
    } else {
      setFormData({
        name: '',
        age: '',
        weight: '',
        color: '',
        character: '',
        coordinates: null,
        cave: null,
        killer: null,
        head: null
      });
    }
    setErrors({});
  }, [dragon, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required and cannot be empty';
    }

    if (!formData.age || formData.age <= 0) {
      newErrors.age = 'Age must be greater than 0';
    }

    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = 'Weight must be greater than 0';
    }

    if (!formData.coordinates) {
      newErrors.coordinates = 'Coordinates are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleObjectSelect = (objectType, objectId) => {
    if (!objectId) {
      handleChange(objectType, null);
      return;
    }

    const object = availableObjects[objectType]?.find(obj => obj.id == objectId);
    handleChange(objectType, object || null);
  };

  const renderObjectSelector = (type, label, required = false) => {
    const objects = availableObjects[type] || [];
    const currentValue = formData[type]?.id || '';

    return (
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
          {label} {required && '*'}
        </label>
        <select
          value={currentValue}
          onChange={(e) => handleObjectSelect(type, e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: errors[type] ? '1px solid #dc3545' : '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          <option value="">Select {label}</option>
          {objects.map(obj => (
            <option key={obj.id} value={obj.id}>
              {type === 'coordinates' && `(${obj.x}, ${obj.y})`}
              {type === 'caves' && `Cave with ${obj.numberOfTreasures} treasures`}
              {type === 'persons' && `${obj.name} (${obj.eyeColor} eyes)`}
              {type === 'heads' && `Head size: ${obj.size}` + (obj.eyesCount ? `, eyes: ${obj.eyesCount}` : '')}
            </option>
          ))}
        </select>
        {errors[type] && (
          <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
            {errors[type]}
          </div>
        )}
      </div>
    );
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={dragon ? 'Edit Dragon' : 'Create New Dragon'}
    >
      <form onSubmit={handleSubmit} style={{ minWidth: '500px' }}>
        {/* Basic Information */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>Basic Information</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: errors.name ? '1px solid #dc3545' : '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
              placeholder="Enter dragon name"
            />
            {errors.name && (
              <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                {errors.name}
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Age *
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value) || '')}
                min="1"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: errors.age ? '1px solid #dc3545' : '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                placeholder="Enter age"
              />
              {errors.age && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                  {errors.age}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Weight *
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => handleChange('weight', parseFloat(e.target.value) || '')}
                min="0.1"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: errors.weight ? '1px solid #dc3545' : '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                placeholder="Enter weight"
              />
              {errors.weight && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                  {errors.weight}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Color
              </label>
              <select
                value={formData.color || ''}
                onChange={(e) => handleChange('color', e.target.value || null)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option value="">Select Color</option>
                <option value="GREEN">GREEN</option>
                <option value="BLUE">BLUE</option>
                <option value="YELLOW">YELLOW</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Character
              </label>
              <select
                value={formData.character || ''}
                onChange={(e) => handleChange('character', e.target.value || null)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option value="">Select Character</option>
                <option value="EVIL">EVIL</option>
                <option value="CHAOTIC">CHAOTIC</option>
                <option value="CHAOTIC_EVIL">CHAOTIC_EVIL</option>
              </select>
            </div>
          </div>
        </div>

        {/* Related Objects */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>Related Objects</h3>
          
          {renderObjectSelector('coordinates', 'Coordinates', true)}
          {renderObjectSelector('cave', 'Dragon Cave')}
          {renderObjectSelector('killer', 'Killer (Person)')}
          {renderObjectSelector('head', 'Dragon Head')}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {dragon ? 'Update Dragon' : 'Create Dragon'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default DragonForm;