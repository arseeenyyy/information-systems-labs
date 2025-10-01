import React, { useState } from 'react';
import PersonTable from '../components/related/PersonTable';
import DragonCaveTable from '../components/related/DragonCaveTable';
import DragonHeadTable from '../components/related/DragonHeadTable';
import CoordinatesTable from '../components/related/CoordinatesTable';
import LocationTable from '../components/related/LocationTable';

function RelatedObjectsPage() {
  const [activeTab, setActiveTab] = useState('persons');

  const renderTable = () => {
    switch (activeTab) {
      case 'persons': return <PersonTable />;
      case 'caves': return <DragonCaveTable />;
      case 'heads': return <DragonHeadTable />;
      case 'coordinates': return <CoordinatesTable />;
      case 'locations': return <LocationTable />;
      default: return <PersonTable />;
    }
  };

  return (
    <div>
      <h1>Related Objects Management</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('persons')}>Persons</button>
        <button onClick={() => setActiveTab('caves')}>Caves</button>
        <button onClick={() => setActiveTab('heads')}>Heads</button>
        <button onClick={() => setActiveTab('coordinates')}>Coordinates</button>
        <button onClick={() => setActiveTab('locations')}>Locations</button>
      </div>

      {renderTable()}
    </div>
  );
}

export default RelatedObjectsPage;