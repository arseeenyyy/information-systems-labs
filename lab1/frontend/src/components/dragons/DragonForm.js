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

  const [showCreateForm, setShowCreateForm] = useState(null); // 'cave', 'person', etc.

  useEffect(() => {
    // Заглушка данных
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

  const handleCreateRelated = (type, newObject) => {
    const newId = Math.max(...relatedObjects[type].map(o => o.id)) + 1;
    const objectWithId = { ...newObject, id: newId };
    
    setRelatedObjects(prev => ({
      ...prev,
      [type]: [...prev[type], objectWithId]
    }));
    
    handleChange(type, objectWithId);
    setShowCreateForm(null);
  };

  const renderCreateForm = () => {
    switch (showCreateForm) {
      case 'cave':
        return (
          <Modal isOpen={true} onClose={() => setShowCreateForm(null)} title="Create New Cave">
            <CaveForm onSave={(cave) => handleCreateRelated('caves', cave)} />
          </Modal>
        );
      case 'person':
        return (
          <Modal isOpen={true} onClose={() => setShowCreateForm(null)} title="Create New Person">
            <PersonForm onSave={(person) => handleCreateRelated('persons', person)} />
          </Modal>
        );
      case 'coordinates':
        return (
          <Modal isOpen={true} onClose={() => setShowCreateForm(null)} title="Create New Coordinates">
            <CoordinatesForm onSave={(coord) => handleCreateRelated('coordinates', coord)} />
          </Modal>
        );
      case 'head':
        return (
          <Modal isOpen={true} onClose={() => setShowCreateForm(null)} title="Create New Dragon Head">
            <HeadForm onSave={(head) => handleCreateRelated('heads', head)} />
          </Modal>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        title={dragon ? 'Edit Dragon' : 'Create New Dragon'}
      >
        <form onSubmit={handleSubmit}>
          {/* Основные поля */}
          <div style={{ marginBottom: '15px' }}>
            <label><strong>Name:</strong></label>
            <input 
              value={formData.name} 
              onChange={e => handleChange('name', e.target.value)}
              required 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label><strong>Age:</strong></label>
              <input 
                type="number"
                value={formData.age} 
                onChange={e => handleChange('age', parseInt(e.target.value))}
                required 
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <div>
              <label><strong>Weight:</strong></label>
              <input 
                type="number"
                step="0.1"
                value={formData.weight} 
                onChange={e => handleChange('weight', parseFloat(e.target.value))}
                required 
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label><strong>Color:</strong></label>
              <select 
                value={formData.color} 
                onChange={e => handleChange('color', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              >
                <option value="">Select Color</option>
                <option value="GREEN">GREEN</option>
                <option value="BLUE">BLUE</option>
                <option value="YELLOW">YELLOW</option>
                <option value="RED">RED</option>
                <option value="BLACK">BLACK</option>
              </select>
            </div>

            <div>
              <label><strong>Character:</strong></label>
              <select 
                value={formData.character} 
                onChange={e => handleChange('character', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              >
                <option value="">Select Character</option>
                <option value="EVIL">EVIL</option>
                <option value="CHAOTIC">CHAOTIC</option>
                <option value="CHAOTIC_EVIL">CHAOTIC_EVIL</option>
                <option value="FRIENDLY">FRIENDLY</option>
              </select>
            </div>
          </div>

          {/* Связанные объекты */}
          <h4>Related Objects</h4>
          
          <div style={{ marginBottom: '15px' }}>
            <label><strong>Coordinates:</strong></label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              <select 
                value={formData.coordinates?.id || ''} 
                onChange={e => handleRelatedChange('coordinates', e.target.value)}
                style={{ flex: 1, padding: '8px' }}
              >
                <option value="">No Coordinates</option>
                {relatedObjects.coordinates.map(coord => (
                  <option key={coord.id} value={coord.id}>
                    ({coord.x}, {coord.y})
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => setShowCreateForm('coordinates')}>
                + New
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label><strong>Cave:</strong></label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              <select 
                value={formData.cave?.id || ''} 
                onChange={e => handleRelatedChange('cave', e.target.value)}
                style={{ flex: 1, padding: '8px' }}
              >
                <option value="">No Cave</option>
                {relatedObjects.caves.map(cave => (
                  <option key={cave.id} value={cave.id}>
                    Cave #{cave.id} ({cave.numberOfTreasures} treasures)
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => setShowCreateForm('cave')}>
                + New
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label><strong>Killer:</strong></label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              <select 
                value={formData.killer?.id || ''} 
                onChange={e => handleRelatedChange('killer', e.target.value)}
                style={{ flex: 1, padding: '8px' }}
              >
                <option value="">No Killer</option>
                {relatedObjects.persons.map(person => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => setShowCreateForm('person')}>
                + New
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label><strong>Head:</strong></label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              <select 
                value={formData.head?.id || ''} 
                onChange={e => handleRelatedChange('head', e.target.value)}
                style={{ flex: 1, padding: '8px' }}
              >
                <option value="">No Head</option>
                {relatedObjects.heads.map(head => (
                  <option key={head.id} value={head.id}>
                    Size: {head.size}, Eyes: {head.eyesCount}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => setShowCreateForm('head')}>
                + New
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
              Save
            </button>
            <button type="button" onClick={onClose} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {renderCreateForm()}
    </>
  );
}

// Простые формы для создания связанных объектов
function CaveForm({ onSave }) {
  const [numberOfTreasures, setNumberOfTreasures] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ numberOfTreasures: parseInt(numberOfTreasures) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Number of Treasures:</label>
      <input 
        type="number" 
        value={numberOfTreasures} 
        onChange={e => setNumberOfTreasures(e.target.value)}
        required 
        style={{ width: '100%', padding: '8px', margin: '10px 0' }}
      />
      <button type="submit">Create Cave</button>
    </form>
  );
}

function PersonForm({ onSave }) {
  const [name, setName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input 
        value={name} 
        onChange={e => setName(e.target.value)}
        required 
        style={{ width: '100%', padding: '8px', margin: '10px 0' }}
      />
      <button type="submit">Create Person</button>
    </form>
  );
}

function CoordinatesForm({ onSave }) {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ x: parseFloat(x), y: parseFloat(y) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>X:</label>
      <input 
        type="number" 
        step="0.1"
        value={x} 
        onChange={e => setX(e.target.value)}
        required 
        style={{ width: '100%', padding: '8px', margin: '5px 0 10px 0' }}
      />
      <label>Y:</label>
      <input 
        type="number" 
        step="0.1"
        value={y} 
        onChange={e => setY(e.target.value)}
        required 
        style={{ width: '100%', padding: '8px', margin: '5px 0 10px 0' }}
      />
      <button type="submit">Create Coordinates</button>
    </form>
  );
}

function HeadForm({ onSave }) {
  const [size, setSize] = useState('');
  const [eyesCount, setEyesCount] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ size: parseInt(size), eyesCount: eyesCount ? parseInt(eyesCount) : null });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Size:</label>
      <input 
        type="number" 
        value={size} 
        onChange={e => setSize(e.target.value)}
        required 
        style={{ width: '100%', padding: '8px', margin: '5px 0 10px 0' }}
      />
      <label>Eyes Count (optional):</label>
      <input 
        type="number" 
        value={eyesCount} 
        onChange={e => setEyesCount(e.target.value)}
        style={{ width: '100%', padding: '8px', margin: '5px 0 10px 0' }}
      />
      <button type="submit">Create Head</button>
    </form>
  );
}

export default DragonForm;