import React, { useState, useEffect } from 'react';
import DragonTable from '../components/dragons/DragonTable';
import DragonForm from '../components/dragons/DragonForm';
import DragonDetails from '../components/dragons/DragonDetails';
import Header from '../components/common/Header';
import '../styles/dragonsPage.css';
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
      const apiData = {
        name: dragonData.name,
        age: parseInt(dragonData.age),
        weight: parseFloat(dragonData.weight),
        color: dragonData.color || null,
        character: dragonData.character || null,
        coordinatesId: parseInt(dragonData.coordinatesId),
        caveId: dragonData.caveId ? parseInt(dragonData.caveId) : null,
        killerId: dragonData.killerId ? parseInt(dragonData.killerId) : null,
        headId: dragonData.headId ? parseInt(dragonData.headId) : null
      };

      const newDragon = await dragonService.create(apiData);
      setDragons(prev => [...prev, newDragon]);
      setShowCreateModal(false);
    } catch (err) {
      console.error('Error creating dragon:', err);
      alert(`Error creating dragon: ${err.message}`);
    }
  };

  const handleEditDragon = async (dragonData) => {
    try {
      const apiData = {
        name: dragonData.name,
        age: parseInt(dragonData.age),
        weight: parseFloat(dragonData.weight),
        color: dragonData.color || null,
        character: dragonData.character || null,
        coordinatesId: parseInt(dragonData.coordinatesId),
        caveId: dragonData.caveId ? parseInt(dragonData.caveId) : null,
        killerId: dragonData.killerId ? parseInt(dragonData.killerId) : null,
        headId: dragonData.headId ? parseInt(dragonData.headId) : null
      };

      const updatedDragon = await dragonService.update(editingDragon.id, apiData);
      setDragons(prev => prev.map(d => 
        d.id === editingDragon.id ? updatedDragon : d
      ));
      setEditingDragon(null);
    } catch (err) {
      console.error('Error updating dragon:', err);
      alert(`Error updating dragon: ${err.message}`);
    }
  };

  const handleRelatedEntityCreated = (type, newEntity) => {
    setAvailableObjects(prev => ({
      ...prev,
      [type]: [...prev[type], newEntity]
    }));
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
  if (loading) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="loading-container">
            Loading dragons and related objects...
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="error-container">
            Error: {error}
            <br />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="dragons-page">
      <Header />
      <div className="container">
        <div className="dragons-header">
          <h1 className="dragons-title">Dragons Management</h1>
          <div className="dragons-actions">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary"
            >
              Create New Dragon
            </button>
          </div>
        </div>

        <div className="dragons-count">
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
          onRelatedEntityCreated={handleRelatedEntityCreated}
        />

        <DragonForm
          isOpen={!!editingDragon}
          onClose={() => setEditingDragon(null)}
          dragon={editingDragon}
          onSave={handleEditDragon}
          existingObjects={availableObjects}
          onRelatedEntityCreated={handleRelatedEntityCreated}
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
    </div>
  );
}

export default DragonsPage;