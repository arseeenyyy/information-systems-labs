import React from 'react';
import EntityTable from '../common/EntityTable';

function PersonTable({ persons, onEdit, onDelete }) {
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'eyeColor', title: 'Eye Color' },
    { key: 'hairColor', title: 'Hair Color' },
    { key: 'height', title: 'Height' },
    { key: 'nationality', title: 'Nationality' },
    { key: 'usedAsKiller', title: 'Used as Killer' }
  ];

  // Заглушка данных
  const data = persons || [
    { id: 1, name: 'Arthur', eyeColor: 'BLUE', hairColor: 'BLONDE', height: 180, nationality: 'ENGLAND', usedAsKiller: 'Dragon #1' },
    { id: 2, name: 'Lancelot', eyeColor: 'GREEN', hairColor: 'BROWN', height: 185, nationality: 'FRANCE', usedAsKiller: 'Dragon #2' }
  ];

  return <EntityTable columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />;
}

export default PersonTable;