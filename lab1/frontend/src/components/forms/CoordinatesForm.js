import React, { useState } from 'react';
import Modal from '../common/Modal';
import { coordinatesService } from '../../services/api';

function CreateCoordinatesForm({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({ x: '', y: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const newErrors = {};
    
    // Валидация X координаты
    if (!formData.x || isNaN(formData.x)) {
      newErrors.x = 'X coordinate is required and must be a number';
    } else {
      const xValue = parseFloat(formData.x);
      if (xValue > 696) {
        newErrors.x = 'X coordinate must be less than or equal to 696';
      }
    }

    // Валидация Y координаты
    if (!formData.y || isNaN(formData.y)) {
      newErrors.y = 'Y coordinate is required and must be a number';
    } else {
      const yValue = parseFloat(formData.y);
      if (yValue > 366) {
        newErrors.y = 'Y coordinate must be less than or equal to 366';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const coordinatesData = {
        x: parseFloat(formData.x),
        y: parseFloat(formData.y)
      };
      
      console.log('Creating coordinates:', coordinatesData);
      const newCoordinates = await coordinatesService.create(coordinatesData);
      console.log('Coordinates created:', newCoordinates);
      
      onSave(newCoordinates);
      setFormData({ x: '', y: '' });
      setErrors({});
    } catch (error) {
      console.error('Error creating coordinates:', error);
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleClose = () => {
    setFormData({ x: '', y: '' });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Coordinates">
      <div style={{ minWidth: '400px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            X Coordinate * (max: 696)
          </label>
          <input
            type="number"
            step="any"
            value={formData.x}
            onChange={(e) => handleChange('x', e.target.value)}
            max="696"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: errors.x ? '1px solid #dc3545' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
            placeholder="Enter X coordinate (max 696)"
          />
          {errors.x && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
              {errors.x}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Y Coordinate * (max: 366)
          </label>
          <input
            type="number"
            step="any"
            value={formData.y}
            onChange={(e) => handleChange('y', e.target.value)}
            max="366"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: errors.y ? '1px solid #dc3545' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
            placeholder="Enter Y coordinate (max 366)"
          />
          {errors.y && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
              {errors.y}
            </div>
          )}
        </div>

        {errors.submit && (
          <div style={{ color: '#dc3545', fontSize: '12px', marginBottom: '15px' }}>
            {errors.submit}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Coordinates'}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CreateCoordinatesForm;