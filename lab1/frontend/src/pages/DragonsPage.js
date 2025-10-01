import React, { useState } from 'react';
import DragonTable from '../components/dragons/DragonTable';
import DragonForm from '../components/dragons/DragonForm';
import DragonDetails from '../components/dragons/DragonDetails';

function DragonsPage() {
  const [dragons, setDragons] = useState([
    { 
      id: 1, 
      name: 'Smaug', 
      age: 150, 
      color: 'RED', 
      weight: 5000, 
      character: 'EVIL',
      coordinates: { id: 1, x: 100, y: 200 },
      creationDate: '2024-01-15',
      cave: { id: 1, numberOfTreasures: 1000 },
      killer: null,
      head: { id: 1, size: 50, eyesCount: 2 }
    },
    { 
      id: 2, 
      name: 'Toothless', 
      age: 20, 
      color: 'BLACK', 
      weight: 800, 
      character: 'FRIENDLY',
      coordinates: { id: 2, x: 300, y: 400 },
      creationDate: '2024-01-10',
      cave: null,
      killer: { id: 1, name: 'Arthur' },
      head: { id: 2, size: 35, eyesCount: 2 }
    }
  ]);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingDragon, setEditingDragon] = useState(null);
  const [viewingDragon, setViewingDragon] = useState(null);

  const handleCreateDragon = (dragonData) => {
    const newDragon = { 
      ...dragonData, 
      id: Date.now(),
      creationDate: new Date().toISOString().split('T')[0]
    };
    setDragons(prev => [...prev, newDragon]);
    setShowCreateModal(false);
  };

  const handleEditDragon = (dragonData) => {
    setDragons(prev => prev.map(d => d.id === editingDragon.id ? { ...d, ...dragonData } : d));
    setEditingDragon(null);
  };

  const handleDeleteDragon = (id) => {
    setDragons(prev => prev.filter(d => d.id !== id));
    setViewingDragon(null);
  };

  const handleViewDragon = (id) => {
    const dragon = dragons.find(d => d.id === id);
    setViewingDragon(dragon);
  };

  return (
    <div>
      <h1>Dragons Management</h1>
      
      <button 
        onClick={() => setShowCreateModal(true)}
        style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Create New Dragon
      </button>

      <DragonTable
        dragons={dragons}
        onEdit={setEditingDragon}
        onDelete={handleDeleteDragon}
        onView={handleViewDragon}
      />

      <DragonForm
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateDragon}
      />

      <DragonForm
        isOpen={!!editingDragon}
        onClose={() => setEditingDragon(null)}
        dragon={editingDragon}
        onSave={handleEditDragon}
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