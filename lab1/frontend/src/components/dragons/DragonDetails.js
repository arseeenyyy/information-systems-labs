import React from 'react';
import Modal from '../common/Modal';
import '../../styles/dragonDetails.css';

function DragonDetails({ dragon, onClose, onEdit, onDelete }) {
  if (!dragon) return null;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete dragon "${dragon.name}"?`)) {
      onDelete(dragon.id);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Dragon Details" size="large">
      <div className="dragon-details-container">
        {/* Basic Information */}
        <div className="dragon-details-section">
          <h3 className="dragon-details-title">Basic Information</h3>
          <div className="dragon-details-grid">
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
        <div className="dragon-details-section">
          <h3 className="dragon-details-title">Related Objects</h3>
          
          <div className="dragon-details-item">
            <strong>Coordinates:</strong> {dragon.coordinates ? `(${dragon.coordinates.x}, ${dragon.coordinates.y})` : 'None'}
          </div>
          
          <div className="dragon-details-item">
            <strong>Cave:</strong> {dragon.cave ? `Cave with ${dragon.cave.numberOfTreasures} treasures` : 'None'}
          </div>
          
          <div className="dragon-details-item">
            <strong>Killer:</strong> {dragon.killer ? `${dragon.killer.name} (${dragon.killer.eyeColor} eyes)` : 'None'}
          </div>
          
          <div className="dragon-details-item">
            <strong>Head:</strong> {dragon.head ? `Size: ${dragon.head.size}` + (dragon.head.eyesCount ? `, Eyes: ${dragon.head.eyesCount}` : '') : 'None'}
          </div>
        </div>

        {/* Actions */}
        <div className="dragon-details-actions">
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