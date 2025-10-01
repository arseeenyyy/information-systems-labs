import React from 'react';
import EntityTable from '../common/EntityTable';

function DragonTable({ dragons, onEdit, onDelete, onView }) {
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
    { key: 'weight', title: 'Weight' },
    { key: 'color', title: 'Color' },
    { key: 'character', title: 'Character' },
    { 
      key: 'coordinates', 
      title: 'Coordinates',
      render: (coordinates) => coordinates ? `(${coordinates.x}, ${coordinates.y})` : 'None'
    },
    { 
      key: 'creationDate', 
      title: 'Creation Date',
      render: (date) => date ? new Date(date).toLocaleDateString() : 'Not set'
    },
    { 
      key: 'cave', 
      title: 'Cave',
      render: (cave) => cave ? `#${cave.id} (${cave.numberOfTreasures} treasures)` : 'None'
    },
    { 
      key: 'killer', 
      title: 'Killer', 
      render: (killer) => killer ? killer.name : 'None'
    },
    { 
      key: 'head', 
      title: 'Head',
      render: (head) => head ? `Size: ${head.size}, Eyes: ${head.eyesCount}` : 'None'
    }
  ];

  return (
    <EntityTable
      columns={columns}
      data={dragons}
      onEdit={onEdit}
      onDelete={onDelete}
      onRowClick={(dragon) => onView(dragon.id)}
    />
  );
}

export default DragonTable;