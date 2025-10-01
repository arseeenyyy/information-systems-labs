import React, { useState } from 'react';
import EntityTable from '../common/EntityTable';
import DragonContextMenu from './DragonContextMenu';

function DragonTable({ dragons, onEdit, onDelete, onView }) {
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedDragon, setSelectedDragon] = useState(null);

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
    { key: 'color', title: 'Color' },
    { key: 'weight', title: 'Weight' },
    { key: 'character', title: 'Character' }
  ];

  const handleContextMenu = (e, dragon) => {
    e.preventDefault();
    setSelectedDragon(dragon);
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
    setSelectedDragon(null);
  };

  return (
    <>
      <EntityTable
        columns={columns}
        data={dragons}
        onEdit={onEdit}
        onDelete={onDelete}
        onRowClick={onView}
      />
      
      {contextMenu && selectedDragon && (
        <DragonContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          dragon={selectedDragon}
          onEdit={() => { onEdit(selectedDragon); handleCloseContextMenu(); }}
          onDelete={() => { onDelete(selectedDragon.id); handleCloseContextMenu(); }}
          onView={() => { onView(selectedDragon.id); handleCloseContextMenu(); }}
          onClose={handleCloseContextMenu}
        />
      )}
    </>
  );
}

export default DragonTable;