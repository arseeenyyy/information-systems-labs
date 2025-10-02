import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import CreateCoordinatesForm from '../forms/CoordinatesForm';
import CreateCaveForm from '../forms/CaveForm';
import CreateHeadForm from '../forms/HeadForm';
import '../../styles/dragonForm.css';

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

    onSave(dragonData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRelatedEntityCreated = (type, newEntity) => {
    if (onRelatedEntityCreated) {
      onRelatedEntityCreated(type, newEntity);
    }
    
    const fieldMap = {
      coordinates: 'coordinatesId',
      caves: 'caveId',
      persons: 'killerId',
      heads: 'headId'
    };
    const fieldName = fieldMap[type];
    
    setFormData(prev => ({ ...prev, [fieldName]: newEntity.id.toString() }));
    
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
    
    const fieldMap = {
      coordinates: 'coordinatesId',
      caves: 'caveId',
      persons: 'killerId', 
      heads: 'headId'
    };
    const fieldName = fieldMap[type];
    const currentValue = formData[fieldName] || '';

    const getCreateModal = () => {
      switch (type) {
        case 'coordinates':
          return (
            <CreateCoordinatesForm
              key="coordinates-form"
              isOpen={showCreateCoordinates}
              onClose={() => setShowCreateCoordinates(false)}
              onSave={(coordinates) => handleRelatedEntityCreated('coordinates', coordinates)}
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
      <div className="object-selector">
        <div className="object-selector-header">
          <label className="object-selector-label">
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
              className="btn btn-outline-primary object-selector-create-btn"
            >
              + Create New
            </button>
          )}
        </div>
        
        <select
          value={currentValue}
          onChange={(e) => handleChange(fieldName, e.target.value)}
          className={`form-control ${errors[type] ? 'error' : ''}`}
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
          <div className="form-error">
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
      size="large"
    >
      <form onSubmit={handleSubmit} className="dragon-form">
        {/* Basic Information */}
        <div className="dragon-form-section">
          <h3 className="dragon-form-section-title">Basic Information</h3>
          
          <div className="form-group">
            <label className="form-label">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`form-control ${errors.name ? 'error' : ''}`}
              placeholder="Enter dragon name"
            />
            {errors.name && (
              <div className="form-error">
                {errors.name}
              </div>
            )}
          </div>

          <div className="dragon-form-grid mb-15">
            <div className="form-group">
              <label className="form-label">
                Age *
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                min="1"
                className={`form-control ${errors.age ? 'error' : ''}`}
                placeholder="Enter age"
              />
              {errors.age && (
                <div className="form-error">
                  {errors.age}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Weight *
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                min="0.1"
                className={`form-control ${errors.weight ? 'error' : ''}`}
                placeholder="Enter weight"
              />
              {errors.weight && (
                <div className="form-error">
                  {errors.weight}
                </div>
              )}
            </div>
          </div>

          <div className="dragon-form-grid">
            <div className="form-group">
              <label className="form-label">
                Color
              </label>
              <select
                value={formData.color || ''}
                onChange={(e) => handleChange('color', e.target.value)}
                className="form-control"
              >
                <option value="">Select Color</option>
                <option value="GREEN">GREEN</option>
                <option value="BLUE">BLUE</option>
                <option value="YELLOW">YELLOW</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Character
              </label>
              <select
                value={formData.character || ''}
                onChange={(e) => handleChange('character', e.target.value)}
                className="form-control"
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
        <div className="dragon-form-section">
          <h3 className="dragon-form-section-title">Related Objects</h3>
          
          {renderObjectSelector('coordinates', 'Coordinates', true)}
          {renderObjectSelector('caves', 'Dragon Cave')}
          {renderObjectSelector('persons', 'Killer (Person)', false, false)}
          {renderObjectSelector('heads', 'Dragon Head')}
        </div>

        {/* Buttons */}
        <div className="modal-footer">
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