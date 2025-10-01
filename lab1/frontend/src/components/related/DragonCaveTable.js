import React from 'react';
import EntityTable from '../common/EntityTable';

function DragonCaveTable() {
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'numberOfTreasures', title: 'Treasures' },
    { key: 'inhabitedBy', title: 'Inhabited By' }
  ];

  const data = [
    { id: 1, numberOfTreasures: 100, inhabitedBy: 'Dragon #1' },
    { id: 2, numberOfTreasures: 500, inhabitedBy: 'Dragon #3' }
  ];

  return <EntityTable columns={columns} data={data} />;
}

export default DragonCaveTable;