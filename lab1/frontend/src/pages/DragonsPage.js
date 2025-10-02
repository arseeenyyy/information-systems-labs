import React, { useState, useEffect } from 'react';
import DragonTable from '../components/dragons/DragonTable';
import DragonForm from '../components/dragons/DragonForm';
import DragonDetails from '../components/dragons/DragonDetails';
import { 
  dragonService, 
  coordinatesService, 
  caveService, 
  personService, 
  headService 
} from '../services/api';

function DragonsPage() {
  const [dragons, setDragons] = useState([]);
  const [availableObjects, setAvailableObjects] = useState({
    coordinates: [],
    caves: [],
    persons: [],
    heads: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingDragon, setEditingDragon] = useState(null);
  const [viewingDragon, setViewingDragon] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [dragonsData, coordinatesData, cavesData, personsData, headsData] = await Promise.all([
        dragonService.getAll(),
        coordinatesService.getAll(),
        caveService.getAll(),
        personService.getAll(),
        headService.getAll()
      ]);

      setDragons(dragonsData);
      setAvailableObjects({
        coordinates: coordinatesData || [],
        caves: cavesData || [],
        persons: personsData || [],
        heads: headsData || []
      });
    } catch (err) {
      setError(err.message);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDragon = async (dragonData) => {
    try {
      const newDragon = await dragonService.create(dragonData);
      setDragons(prev => [...prev, newDragon]);
      setShowCreateModal(false);
    } catch (err) {
      console.error('Error creating dragon:', err);
      alert(`Error creating dragon: ${err.message}`);
    }
  };

  const handleEditDragon = async (dragonData) => {
    try {
      const updatedDragon = await dragonService.update(editingDragon.id, dragonData);
      setDragons(prev => prev.map(d => 
        d.id === editingDragon.id ? updatedDragon : d
      ));
      setEditingDragon(null);
    } catch (err) {
      console.error('Error updating dragon:', err);
      alert(`Error updating dragon: ${err.message}`);
    }
  };

  const handleDeleteDragon = async (id) => {
    try {
      await dragonService.delete(id);
      setDragons(prev => prev.filter(d => d.id !== id));
      setViewingDragon(null);
    } catch (err) {
      console.error('Error deleting dragon:', err);
      alert(`Error deleting dragon: ${err.message}`);
    }
  };

  const handleViewDragon = (dragon) => {
    setViewingDragon(dragon);
  };

  const refreshData = () => {
    loadAllData();
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          Loading dragons and related objects...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div style={{ color: '#dc3545', textAlign: 'center', padding: '40px' }}>
          Error: {error}
          <br />
          <button onClick={refreshData} className="btn btn-primary" style={{ marginTop: '10px' }}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Dragons Management System</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            onClick={refreshData}
            className="btn btn-secondary"
          >
            Refresh Data
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            Create New Dragon
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '15px', color: '#6c757d' }}>
        Total dragons: {dragons.length}
      </div>

      <DragonTable
        dragons={dragons}
        onRowClick={handleViewDragon}
      />

      <DragonForm
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateDragon}
        existingObjects={availableObjects}
      />

      <DragonForm
        isOpen={!!editingDragon}
        onClose={() => setEditingDragon(null)}
        dragon={editingDragon}
        onSave={handleEditDragon}
        existingObjects={availableObjects}
      />

      {viewingDragon && (
        <DragonDetails
          dragon={viewingDragon}
          onClose={() => setViewingDragon(null)}
          onEdit={setEditingDragon}
          onDelete={handleDeleteDragon}
        />
      )}
    </div>
  );
}

export default DragonsPage;