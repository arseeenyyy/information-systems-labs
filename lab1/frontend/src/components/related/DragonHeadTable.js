import React from 'react';
import EntityTable from '../common/EntityTable';

function DragonHeadTable() {
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'size', title: 'Size' },
    { key: 'eyesCount', title: 'Eyes Count' },
    { key: 'usedByDragon', title: 'Used By Dragon' }
  ];

  const data = [
    { id: 1, size: 50, eyesCount: 2, usedByDragon: 'Dragon #1' },
    { id: 2, size: 75, eyesCount: 3, usedByDragon: 'Dragon #2' }
  ];

  return <EntityTable columns={columns} data={data} />;
}

export default DragonHeadTable; 