import React from 'react';
import Modal from '../common/Modal';

function DragonDetails({ dragon, onClose, onEdit, onDelete }) {
  if (!dragon) return null;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete dragon "${dragon.name}"?`)) {
      onDelete(dragon.id);
      onClose();
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Dragon Details">
      <div style={{ minWidth: '500px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <div><strong>ID:</strong> {dragon.id}</div>
          <div><strong>Name:</strong> {dragon.name}</div>
          <div><strong>Age:</strong> {dragon.age}</div>
          <div><strong>Weight:</strong> {dragon.weight}</div>
          <div><strong>Color:</strong> {dragon.color || 'None'}</div>
          <div><strong>Character:</strong> {dragon.character || 'None'}</div>
          <div><strong>Creation Date:</strong> {dragon.creationDate ? new Date(dragon.creationDate).toLocaleDateString() : 'Not set'}</div>
        </div>

        {/* Связанные объекты */}
        <div style={{ borderTop: '1px solid #ccc', paddingTop: '15px', marginBottom: '20px' }}>
          <h4>Related Objects</h4>
          
          <div><strong>Coordinates:</strong> {dragon.coordinates ? `(${dragon.coordinates.x}, ${dragon.coordinates.y})` : 'None'}</div>
          
          <div><strong>Cave:</strong> {dragon.cave ? `Cave #${dragon.cave.id} with ${dragon.cave.numberOfTreasures} treasures` : 'None'}</div>
          
          <div><strong>Killer:</strong> {dragon.killer ? dragon.killer.name : 'None'}</div>
          
          <div><strong>Head:</strong> {dragon.head ? `Size: ${dragon.head.size}, Eyes: ${dragon.head.eyesCount}` : 'None'}</div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #ccc', paddingTop: '15px' }}>
          <button 
            onClick={() => { onEdit(dragon); onClose(); }}
            style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Edit Dragon
          </button>
          <button 
            onClick={handleDelete}
            style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Delete Dragon
          </button>
          <button 
            onClick={onClose}
            style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DragonDetails;