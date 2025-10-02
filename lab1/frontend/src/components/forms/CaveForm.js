import React, { useState } from 'react';
import Modal from '../common/Modal';
import { caveService } from '../../services/api';

function CreateCaveForm({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({ numberOfTreasures: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const newErrors = {};
    
    // Валидация количества сокровищ
    if (formData.numberOfTreasures && formData.numberOfTreasures !== '') {
      const treasures = parseInt(formData.numberOfTreasures);
      if (isNaN(treasures) || treasures <= 0) {
        newErrors.numberOfTreasures = 'Number of treasures must be greater than 0';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const caveData = {
        numberOfTreasures: formData.numberOfTreasures && formData.numberOfTreasures !== '' 
          ? parseInt(formData.numberOfTreasures) 
          : null
      };
      
      const newCave = await caveService.create(caveData);
      onSave(newCave);
      setFormData({ numberOfTreasures: '' });
      setErrors({});
    } catch (error) {
      console.error('Error creating cave:', error);
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
    setFormData({ numberOfTreasures: '' });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Dragon Cave">
      <div style={{ minWidth: '400px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Number of Treasures (optional)
          </label>
          <input
            type="number"
            value={formData.numberOfTreasures}
            onChange={(e) => handleChange('numberOfTreasures', e.target.value)}
            min="1"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: errors.numberOfTreasures ? '1px solid #dc3545' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
            placeholder="Enter number of treasures (optional, must be > 0)"
          />
          {errors.numberOfTreasures && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
              {errors.numberOfTreasures}
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
            {loading ? 'Creating...' : 'Create Cave'}
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

export default CreateCaveForm;