import React, { useState } from 'react';
import DragonTable from '../components/dragons/DragonTable';
import DragonForm from '../components/dragons/DragonForm';
import DragonDetails from '../components/dragons/DragonDetails';

function DragonsPage() {
  // Mock данные для демонстрации
  const mockObjects = {
    coordinates: [
      { id: 1, x: 100, y: 200 },
      { id: 2, x: 300, y: 400 },
      { id: 3, x: 150, y: 250 }
    ],
    caves: [
      { id: 1, numberOfTreasures: 1000 },
      { id: 2, numberOfTreasures: 500 },
      { id: 3, numberOfTreasures: 750 }
    ],
    persons: [
      { 
        id: 1, 
        name: 'Arthur', 
        eyeColor: 'BLUE', 
        hairColor: 'BLONDE',
        height: 180,
        nationality: 'SPAIN'
      },
      { 
        id: 2, 
        name: 'Lancelot', 
        eyeColor: 'GREEN', 
        hairColor: 'BROWN',
        height: 185,
        nationality: 'ITALY'
      }
    ],
    heads: [
      { id: 1, size: 50, eyesCount: 2 },
      { id: 2, size: 75, eyesCount: 3 },
      { id: 3, size: 60, eyesCount: null }
    ]
  };

  const [dragons, setDragons] = useState([
    {
      id: 1,
      name: 'Smaug',
      age: 150,
      weight: 5000,
      color: 'RED',
      character: 'EVIL',
      coordinates: mockObjects.coordinates[0],
      creationDate: '2024-01-15T00:00:00Z',
      cave: mockObjects.caves[0],
      killer: null,
      head: mockObjects.heads[0]
    },
    {
      id: 2,
      name: 'Toothless',
      age: 20,
      weight: 800,
      color: 'BLACK',
      character: 'FRIENDLY',
      coordinates: mockObjects.coordinates[1],
      creationDate: '2024-01-10T00:00:00Z',
      cave: null,
      killer: mockObjects.persons[0],
      head: mockObjects.heads[1]
    },
    {
      id: 3,
      name: 'Draco',
      age: 75,
      weight: 2500,
      color: 'GREEN',
      character: 'CHAOTIC',
      coordinates: mockObjects.coordinates[2],
      creationDate: '2024-01-20T00:00:00Z',
      cave: mockObjects.caves[1],
      killer: null,
      head: mockObjects.heads[2]
    }
  ]);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingDragon, setEditingDragon] = useState(null);
  const [viewingDragon, setViewingDragon] = useState(null);

  const handleCreateDragon = (dragonData) => {
    const newDragon = {
      ...dragonData,
      id: Date.now(), // Mock ID generation
      creationDate: new Date().toISOString()
    };
    setDragons(prev => [...prev, newDragon]);
    setShowCreateModal(false);
  };

  const handleEditDragon = (dragonData) => {
    setDragons(prev => prev.map(d => 
      d.id === editingDragon.id ? { ...d, ...dragonData } : d
    ));
    setEditingDragon(null);
  };

  const handleDeleteDragon = (id) => {
    setDragons(prev => prev.filter(d => d.id !== id));
    setViewingDragon(null);
  };

  const handleViewDragon = (dragon) => {
    setViewingDragon(dragon);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Dragons Management System</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          Create New Dragon
        </button>
      </div>

      <DragonTable
        dragons={dragons}
        onRowClick={handleViewDragon}
      />

      {/* Create Dragon Modal */}
      <DragonForm
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateDragon}
        existingObjects={mockObjects}
      />

      {/* Edit Dragon Modal */}
      <DragonForm
        isOpen={!!editingDragon}
        onClose={() => setEditingDragon(null)}
        dragon={editingDragon}
        onSave={handleEditDragon}
        existingObjects={mockObjects}
      />

      {/* Dragon Details Modal */}
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