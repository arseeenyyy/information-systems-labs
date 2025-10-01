import React, { useState } from 'react';
import DragonTable from '../components/dragons/DragonTable';
import DragonForm from '../components/dragons/DragonForm';
// import DragonDetails from '../components/dragons/DragonDetails';
// import Pagination from '../components/common/Pagination';

function DragonsPage() {
  const [dragons, setDragons] = useState([
    { id: 1, name: 'Smaug', age: 150, color: 'RED', weight: 5000, character: 'EVIL' },
    { id: 2, name: 'Toothless', age: 20, color: 'BLACK', weight: 800, character: 'FRIENDLY' }
  ]);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingDragon, setEditingDragon] = useState(null);
  const [viewingDragon, setViewingDragon] = useState(null);

  const handleCreateDragon = (dragonData) => {
    const newDragon = { ...dragonData, id: Date.now() };
    setDragons(prev => [...prev, newDragon]);
    setShowCreateModal(false);
  };

  const handleEditDragon = (dragonData) => {
    setDragons(prev => prev.map(d => d.id === editingDragon.id ? { ...d, ...dragonData } : d));
    setEditingDragon(null);
  };

  const handleDeleteDragon = (id) => {
    if (window.confirm('Delete this dragon?')) {
      setDragons(prev => prev.filter(d => d.id !== id));
    }
  };

  return (
    <div>
      <h1>Dragons Management</h1>
      
      <button onClick={() => setShowCreateModal(true)}>Create New Dragon</button>

      <DragonTable
        dragons={dragons}
        onEdit={setEditingDragon}
        onDelete={handleDeleteDragon}
        onView={setViewingDragon}
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

      {/* {viewingDragon && (
        <DragonDetails
          dragon={viewingDragon}
          onClose={() => setViewingDragon(null)}
          onEdit={setEditingDragon}
        />
      )} */}
    </div>
  );
}

export default DragonsPage;