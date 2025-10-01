import React from 'react';
import EntityTable from '../common/EntityTable';

function CoordinatesTable() {
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'x', title: 'X' },
    { key: 'y', title: 'Y' },
    { key: 'usedByDragon', title: 'Used By Dragon' }
  ];

  const data = [
    { id: 1, x: 100, y: 200, usedByDragon: 'Dragon #1' },
    { id: 2, x: 300, y: 400, usedByDragon: 'Dragon #2' }
  ];

  return <EntityTable columns={columns} data={data} />;
}

export default CoordinatesTable;