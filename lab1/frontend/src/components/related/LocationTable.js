import React from 'react';
import EntityTable from '../common/EntityTable';

function LocationTable() {
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'x', title: 'X' },
    { key: 'y', title: 'Y' },
    { key: 'z', title: 'Z' },
    { key: 'name', title: 'Name' },
    { key: 'usedByPerson', title: 'Used by Person' },
    { key: 'usedByDragon', title: 'Used by Dragon' }
  ];

  const data = [
    { id: 1, x: 100, y: 200, z: 300, name: 'Forest', usedByPerson: 'Arthur', usedByDragon: 'None' },
    { id: 2, x: 500, y: 600, z: 700, name: 'Mountain', usedByPerson: 'None', usedByDragon: 'Dragon #1' }
  ];

  return <EntityTable columns={columns} data={data} />;
}

export default LocationTable;