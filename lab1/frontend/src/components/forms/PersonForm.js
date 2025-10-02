import React, { useState } from 'react';
import Modal from '../common/Modal';
import { personService } from '../../services/api';

function CreatePersonForm({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({ 
    name: '', 
    height: '', 
    eyeColor: '', 
    hairColor: '',
    nationality: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const newErrors = {};
    
    // Валидация имени
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    // Валидация роста
    if (!formData.height || isNaN(formData.height) || formData.height <= 0) {
      newErrors.height = 'Height is required and must be greater than 0';
    }

    // Валидация цвета глаз
    if (!formData.eyeColor) {
      newErrors.eyeColor = 'Eye color is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const personData = {
        name: formData.name.trim(),
        height: parseInt(formData.height),
        eyeColor: formData.eyeColor,
        hairColor: formData.hairColor || null,
        nationality: formData.nationality || null
      };
      
      const newPerson = await personService.create(personData);
      onSave(newPerson);
      setFormData({ name: '', height: '', eyeColor: '', hairColor: '', nationality: '' });
      setErrors({});
    } catch (error) {
      console.error('Error creating person:', error);
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
    setFormData({ name: '', height: '', eyeColor: '', hairColor: '', nationality: '' });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Person">
      <div style={{ minWidth: '400px' }}>
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
            placeholder="Enter person name"
          />
          {errors.name && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
              {errors.name}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Height * (must be '&gt' 0)
          </label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => handleChange('height', e.target.value)}
            min="1"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: errors.height ? '1px solid #dc3545' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
            placeholder="Enter height"
          />
          {errors.height && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
              {errors.height}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Eye Color *
            </label>
            <select
              value={formData.eyeColor}
              onChange={(e) => handleChange('eyeColor', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: errors.eyeColor ? '1px solid #dc3545' : '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              <option value="">Select Eye Color</option>
              <option value="GREEN">GREEN</option>
              <option value="BLUE">BLUE</option>
              <option value="YELLOW">YELLOW</option>
            </select>
            {errors.eyeColor && (
              <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                {errors.eyeColor}
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Hair Color
            </label>
            <select
              value={formData.hairColor || ''}
              onChange={(e) => handleChange('hairColor', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              <option value="">Select Hair Color</option>
              <option value="GREEN">GREEN</option>
              <option value="BLUE">BLUE</option>
              <option value="YELLOW">YELLOW</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Nationality
          </label>
          <select
            value={formData.nationality || ''}
            onChange={(e) => handleChange('nationality', e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="">Select Nationality</option>
            <option value="SPAIN">SPAIN</option>
            <option value="VATICAN">VATICAN</option>
            <option value="ITALY">ITALY</option>
          </select>
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
            {loading ? 'Creating...' : 'Create Person'}
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

export default CreatePersonForm;