import React from 'react';
import Modal from '../common/Modal';

function DragonDetails({ dragon, onClose, onEdit, onDelete }) {
  if (!dragon) return null;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete dragon "${dragon.name}"?`)) {
      onDelete(dragon.id);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Dragon Details">
      <div style={{ minWidth: '500px' }}>
        {/* Basic Information */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ marginBottom: '15px', color: '#333', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            Basic Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div><strong>ID:</strong> {dragon.id}</div>
            <div><strong>Name:</strong> {dragon.name}</div>
            <div><strong>Age:</strong> {dragon.age}</div>
            <div><strong>Weight:</strong> {dragon.weight} kg</div>
            <div><strong>Color:</strong> {dragon.color || 'Not specified'}</div>
            <div><strong>Character:</strong> {dragon.character || 'Not specified'}</div>
            <div><strong>Creation Date:</strong> {dragon.creationDate ? new Date(dragon.creationDate).toLocaleDateString() : 'Not set'}</div>
          </div>
        </div>

        {/* Related Objects */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ marginBottom: '15px', color: '#333', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            Related Objects
          </h3>
          
          <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <strong>Coordinates:</strong> {dragon.coordinates ? `(${dragon.coordinates.x}, ${dragon.coordinates.y})` : 'None'}
          </div>
          
          <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <strong>Cave:</strong> {dragon.cave ? `Cave with ${dragon.cave.numberOfTreasures} treasures` : 'None'}
          </div>
          
          <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <strong>Killer:</strong> {dragon.killer ? `${dragon.killer.name} (${dragon.killer.eyeColor} eyes)` : 'None'}
          </div>
          
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <strong>Head:</strong> {dragon.head ? `Size: ${dragon.head.size}` + (dragon.head.eyesCount ? `, Eyes: ${dragon.head.eyesCount}` : '') : 'None'}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <button
            onClick={() => { onEdit(dragon); onClose(); }}
            className="btn btn-primary"
          >
            Edit Dragon
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-danger"
          >
            Delete Dragon
          </button>
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DragonDetails;