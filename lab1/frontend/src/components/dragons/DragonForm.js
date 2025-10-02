import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import CreateCoordinatesForm from '../forms/CoordinatesForm';
import CreateCaveForm from '../forms/CaveForm';
import CreateHeadForm from '../forms/HeadForm';

function DragonForm({ isOpen, onClose, dragon, onSave, existingObjects, onRelatedEntityCreated }) {
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
  const [showCreateCoordinates, setShowCreateCoordinates] = useState(false);
  const [showCreateCave, setShowCreateCave] = useState(false);
  const [showCreateHead, setShowCreateHead] = useState(false);

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
    
    console.log('Form submitted with data:', formData);
    
    const newErrors = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.age || formData.age <= 0) {
      newErrors.age = 'Age must be greater than 0';
    }
    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = 'Weight must be greater than 0';
    }
    if (!formData.coordinatesId) {
      newErrors.coordinates = 'Coordinates are required';
    }

    if (Object.keys(newErrors).length > 0) {
      console.log('Validation errors:', newErrors);
      setErrors(newErrors);
      return;
    }

    const dragonData = {
      name: formData.name.trim(),
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      color: formData.color || null,
      character: formData.character || null,
      coordinatesId: parseInt(formData.coordinatesId),
      caveId: formData.caveId && formData.caveId !== '' ? parseInt(formData.caveId) : null,
      killerId: formData.killerId && formData.killerId !== '' ? parseInt(formData.killerId) : null,
      headId: formData.headId && formData.headId !== '' ? parseInt(formData.headId) : null
    };

    console.log('Sending dragon data to parent:', dragonData);
    onSave(dragonData);
  };

  const handleChange = (field, value) => {
    console.log(`Field ${field} changed to:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRelatedEntityCreated = (type, newEntity) => {
    console.log(`New ${type} created:`, newEntity);
    
    // Уведомляем родительский компонент о новой сущности
    if (onRelatedEntityCreated) {
      onRelatedEntityCreated(type, newEntity);
    } else {
      console.warn('onRelatedEntityCreated callback is not provided');
    }
    
    // Автоматически выбираем новую созданную сущность
    const fieldMap = {
      coordinates: 'coordinatesId',
      caves: 'caveId',
      persons: 'killerId',
      heads: 'headId'
    };
    const fieldName = fieldMap[type];
    
    setFormData(prev => ({ ...prev, [fieldName]: newEntity.id.toString() }));
    console.log(`Auto-selected ${type} with ID:`, newEntity.id);
    
    // Закрываем модальное окно создания
    switch (type) {
      case 'coordinates':
        setShowCreateCoordinates(false);
        break;
      case 'caves':
        setShowCreateCave(false);
        break;
      case 'heads':
        setShowCreateHead(false);
        break;
      default:
        break;
    }
  };

  const renderObjectSelector = (type, label, required = false, showCreateButton = true) => {
    const objects = existingObjects[type] || [];
    
    // Маппинг типов на имена полей в formData
    const fieldMap = {
      coordinates: 'coordinatesId',
      caves: 'caveId',
      persons: 'killerId', 
      heads: 'headId'
    };
    const fieldName = fieldMap[type];
    const currentValue = formData[fieldName] || '';

    console.log(`Rendering ${type} selector:`);
    console.log('Field name:', fieldName);
    console.log('Current value:', currentValue);
    console.log('Available objects:', objects);

    const getCreateModal = () => {
      switch (type) {
        case 'coordinates':
          return (
            <CreateCoordinatesForm
              key="coordinates-form"
              isOpen={showCreateCoordinates}
              onClose={() => {
                console.log('Closing coordinates form');
                setShowCreateCoordinates(false);
              }}
              onSave={(coordinates) => {
                console.log('Coordinates form saved:', coordinates);
                handleRelatedEntityCreated('coordinates', coordinates);
              }}
            />
          );
        case 'caves':
          return (
            <CreateCaveForm
              key="cave-form"
              isOpen={showCreateCave}
              onClose={() => setShowCreateCave(false)}
              onSave={(cave) => handleRelatedEntityCreated('caves', cave)}
            />
          );
        case 'heads':
          return (
            <CreateHeadForm
              key="head-form"
              isOpen={showCreateHead}
              onClose={() => setShowCreateHead(false)}
              onSave={(head) => handleRelatedEntityCreated('heads', head)}
            />
          );
        default:
          return null;
      }
    };

    return (
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
          <label style={{ fontWeight: '500' }}>
            {label} {required && '*'}
          </label>
          {showCreateButton && (
            <button
              type="button"
              onClick={() => {
                switch (type) {
                  case 'coordinates':
                    setShowCreateCoordinates(true);
                    break;
                  case 'caves':
                    setShowCreateCave(true);
                    break;
                  case 'heads':
                    setShowCreateHead(true);
                    break;
                  default:
                    break;
                }
              }}
              className="btn btn-outline-primary"
              style={{ fontSize: '12px', padding: '4px 8px' }}
            >
              + Create New
            </button>
          )}
        </div>
        
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
        
        {showCreateButton && getCreateModal()}
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
          {renderObjectSelector('persons', 'Killer (Person)', false, false)}
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