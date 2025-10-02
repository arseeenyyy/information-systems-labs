import React from 'react';
import EntityTable from '../common/EntityTable';

function DragonTable({ dragons, onRowClick }) {
  const columns = [
    {
      key: 'id',
      title: 'ID',
      render: (value) => value || 'N/A'
    },
    {
      key: 'name',
      title: 'Name',
      render: (value) => value || 'N/A'
    },
    {
      key: 'age',
      title: 'Age',
      render: (value) => value || 'N/A'
    },
    {
      key: 'weight',
      title: 'Weight',
      render: (value) => value ? `${value} kg` : 'N/A'
    },
    {
      key: 'color',
      title: 'Color',
      render: (value) => value || 'Not specified'
    },
    {
      key: 'character',
      title: 'Character',
      render: (value) => value || 'Not specified'
    },
    {
      key: 'coordinates',
      title: 'Coordinates',
      render: (value) => value ? `(${value.x}, ${value.y})` : 'None'
    },
    {
      key: 'creationDate',
      title: 'Creation Date',
      render: (value) => value ? new Date(value).toLocaleDateString() : 'N/A'
    },
    {
      key: 'cave',
      title: 'Cave',
      render: (value) => value ? `${value.numberOfTreasures} treasures` : 'None'
    },
    {
      key: 'killer',
      title: 'Killer',
      render: (value) => value ? value.name : 'None'
    },
    {
      key: 'head',
      title: 'Head',
      render: (value) => value ? `Size: ${value.size}` + (value.eyesCount ? `, Eyes: ${value.eyesCount}` : '') : 'None'
    }
  ];

  return (
    <EntityTable
      columns={columns}
      data={dragons}
      onRowClick={onRowClick}
      emptyMessage="No dragons found"
    />
  );
}

export default DragonTable;