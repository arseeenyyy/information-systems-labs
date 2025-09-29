import React, { useState, useEffect } from 'react';

function App() {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({ x: '', y: '', z: '', name: '' });

  const API_URL = 'http://localhost:8080/inflab/api/locations';

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      console.log('=== LOADING LOCATIONS ===');
      const response = await fetch(API_URL);
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await response.json();
      console.log('Locations data:', data);
      
      setLocations(data);
    } catch (error) {
      console.log('Error loading:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('=== CREATING LOCATION ===');
      console.log('Sending data:', form);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          x: parseInt(form.x),
          y: parseFloat(form.y),
          z: parseInt(form.z),
          name: form.name
        })
      });

      console.log('Create response status:', response.status);
      console.log('Create response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const newLocation = await response.json();
        console.log('Created location:', newLocation);
        
        setLocations([...locations, newLocation]);
        setForm({ x: '', y: '', z: '', name: '' });
      } else {
        const errorText = await response.text();
        console.log('Error response:', errorText);
      }
    } catch (error) {
      console.log('Error creating:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log('=== DELETING LOCATION ===', id);
      
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      console.log('Delete response status:', response.status);
      
      if (response.ok) {
        setLocations(locations.filter(loc => loc.id !== id));
        console.log('Location deleted successfully');
      } else {
        console.log('Delete failed with status:', response.status);
      }
    } catch (error) {
      console.log('Error deleting:', error);
    }
  };

  return (
    <div>
      <h1>Locations</h1>
      
      {/* Форма */}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="X"
          value={form.x}
          onChange={e => setForm({...form, x: e.target.value})}
          required
        />
        <input
          type="number"
          step="0.1"
          placeholder="Y"
          value={form.y}
          onChange={e => setForm({...form, y: e.target.value})}
        />
        <input
          type="number"
          placeholder="Z"
          value={form.z}
          onChange={e => setForm({...form, z: e.target.value})}
        />
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          required
        />
        <button type="submit">Add</button>
      </form>

      {/* Таблица */}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>X</th>
            <th>Y</th>
            <th>Z</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location.id}>
              <td>{location.id}</td>
              <td>{location.x}</td>
              <td>{location.y}</td>
              <td>{location.z}</td>
              <td>{location.name}</td>
              <td>
                <button onClick={() => handleDelete(location.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Кнопка обновления */}
      <button onClick={loadLocations}>Refresh</button>

      {/* Информация */}
      <div>
        <p>Total locations: {locations.length}</p>
        <p>Check browser console for debug info</p>
      </div>
    </div>
  );
}

export default App;