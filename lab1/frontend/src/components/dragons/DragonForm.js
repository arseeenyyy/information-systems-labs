import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

function DragonForm({ isOpen, onClose, dragon, onSave, existingObjects }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    color: '',
    character: '',
    coordinatesId: '',
    caveId: '',
    killerId: '',
    headId: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (dragon) {
      setFormData({
        name: dragon.name || '',
        age: dragon.age || '',
        weight: dragon.weight || '',
        color: dragon.color || '',
        character: dragon.character || '',
        coordinatesId: dragon.coordinates?.id || '',
        caveId: dragon.cave?.id || '',
        killerId: dragon.killer?.id || '',
        headId: dragon.head?.id || ''
      });
    } else {
      setFormData({
        name: '',
        age: '',
        weight: '',
        color: '',
        character: '',
        coordinatesId: '',
        caveId: '',
        killerId: '',
        headId: ''
      });
    }
    setErrors({});
  }, [dragon, isOpen]);

    const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name?.trim()) {
        setErrors({ name: 'Name is required' });
        return;
    }
    if (!formData.age || formData.age <= 0) {
        setErrors({ age: 'Age must be greater than 0' });
        return;
    }
    if (!formData.weight || formData.weight <= 0) {
        setErrors({ weight: 'Weight must be greater than 0' });
        return;
    }
    if (!formData.coordinatesId) {
        setErrors({ coordinates: 'Coordinates are required' });
        return;
    }

    const coordinatesId = parseInt(formData.coordinatesId);
    if (isNaN(coordinatesId) || coordinatesId <= 0) {
        setErrors({ coordinates: 'Please select valid coordinates' });
        return;
    }

    const dragonData = {
        name: formData.name.trim(),
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        color: formData.color || null,
        character: formData.character || null,
        coordinatesId: coordinatesId,
        caveId: formData.caveId && formData.caveId !== '' ? parseInt(formData.caveId) : null,
        killerId: formData.killerId && formData.killerId !== '' ? parseInt(formData.killerId) : null,
        headId: formData.headId && formData.headId !== '' ? parseInt(formData.headId) : null
    };

    if (!dragonData.coordinatesId) {
        setErrors({ coordinates: 'Coordinates are required' });
        return;
    }

    console.log('Sending dragon data:', dragonData);
    onSave(dragonData);
    };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const renderObjectSelector = (type, label, required = false) => {
    const objects = existingObjects[type] || [];
    const fieldName = `${type}Id`;
    const currentValue = formData[fieldName] || '';

    return (
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
          {label} {required && '*'}
        </label>
        <select
          value={currentValue}
          onChange={(e) => handleChange(fieldName, e.target.value)}
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
              {type === 'caves' && `Cave with ${obj.numberOfTreasures || 'no'} treasures`}
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
                onChange={(e) => handleChange('age', e.target.value)}
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
                onChange={(e) => handleChange('weight', e.target.value)}
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
                onChange={(e) => handleChange('color', e.target.value)}
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
                onChange={(e) => handleChange('character', e.target.value)}
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
          {renderObjectSelector('caves', 'Dragon Cave')}
          {renderObjectSelector('persons', 'Killer (Person)')}
          {renderObjectSelector('heads', 'Dragon Head')}
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