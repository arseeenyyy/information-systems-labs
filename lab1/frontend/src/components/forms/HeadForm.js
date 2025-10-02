import React, { useState } from 'react';
import Modal from '../common/Modal';
import { headService } from '../../services/api';

function CreateHeadForm({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({ size: '', eyesCount: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const newErrors = {};
    
    // Валидация размера
    if (!formData.size || isNaN(formData.size) || formData.size <= 0) {
      newErrors.size = 'Size is required and must be greater than 0';
    }

    // Валидация количества глаз
    if (formData.eyesCount && formData.eyesCount !== '') {
      const eyes = parseInt(formData.eyesCount);
      if (isNaN(eyes) || eyes < 0) {
        newErrors.eyesCount = 'Eyes count must be a non-negative number';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const headData = {
        size: parseInt(formData.size),
        eyesCount: formData.eyesCount && formData.eyesCount !== '' ? parseInt(formData.eyesCount) : null
      };
      
      const newHead = await headService.create(headData);
      onSave(newHead);
      setFormData({ size: '', eyesCount: '' });
      setErrors({});
    } catch (error) {
      console.error('Error creating head:', error);
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
    setFormData({ size: '', eyesCount: '' });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Dragon Head">
      <div style={{ minWidth: '400px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Size * (must be '&gt' 0)
          </label>
          <input
            type="number"
            value={formData.size}
            onChange={(e) => handleChange('size', e.target.value)}
            min="1"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: errors.size ? '1px solid #dc3545' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
            placeholder="Enter head size"
          />
          {errors.size && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
              {errors.size}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Eyes Count (optional)
          </label>
          <input
            type="number"
            value={formData.eyesCount}
            onChange={(e) => handleChange('eyesCount', e.target.value)}
            min="0"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: errors.eyesCount ? '1px solid #dc3545' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
            placeholder="Enter eyes count (optional, non-negative)"
          />
          {errors.eyesCount && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
              {errors.eyesCount}
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
            {loading ? 'Creating...' : 'Create Head'}
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

export default CreateHeadForm;