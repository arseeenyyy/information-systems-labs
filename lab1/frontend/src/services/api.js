const API_BASE = 'http://127.0.0.1:8080/inflab/api'; 

const api = {
  async get(url) {
    const response = await fetch(`${API_BASE}${url}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  async post(url, data) {
    const response = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  async put(url, data) {
    const response = await fetch(`${API_BASE}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  async delete(url) {
    const response = await fetch(`${API_BASE}${url}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.ok;
  }
};

// Сервисы для каждой сущности
export const dragonService = {
  getAll: () => api.get('/dragons'),
  getById: (id) => api.get(`/dragons/${id}`),
  create: (dragon) => api.post('/dragons', dragon),
  update: (id, dragon) => api.put(`/dragons/${id}`, dragon),
  delete: (id) => api.delete(`/dragons/${id}`),
  findByColor: (color) => api.get(`/dragons/color/${color}`)
};

export const coordinatesService = {
  getAll: () => api.get('/coordinates'),
  getById: (id) => api.get(`/coordinates/${id}`),
  create: (coordinates) => api.post('/coordinates', coordinates),
  update: (id, coordinates) => api.put(`/coordinates/${id}`, coordinates),
  delete: (id) => api.delete(`/coordinates/${id}`)
};

export const caveService = {
  getAll: () => api.get('/caves'),
  getById: (id) => api.get(`/caves/${id}`),
  create: (cave) => api.post('/caves', cave),
  update: (id, cave) => api.put(`/caves/${id}`, cave),
  delete: (id) => api.delete(`/caves/${id}`)
};

export const personService = {
  getAll: () => api.get('/persons'),
  getById: (id) => api.get(`/persons/${id}`),
  create: (person) => api.post('/persons', person),
  update: (id, person) => api.put(`/persons/${id}`, person),
  delete: (id) => api.delete(`/persons/${id}`),
  findByEyeColor: (color) => api.get(`/persons/eye-color/${color}`)
};

export const headService = {
  getAll: () => api.get('/heads'),
  getById: (id) => api.get(`/heads/${id}`),
  create: (head) => api.post('/heads', head),
  update: (id, head) => api.put(`/heads/${id}`, head),
  delete: (id) => api.delete(`/heads/${id}`)
};

export const locationService = {
  getAll: () => api.get('/locations'),
  getById: (id) => api.get(`/locations/${id}`),
  create: (location) => api.post('/locations', location),
  update: (id, location) => api.put(`/locations/${id}`, location),
  delete: (id) => api.delete(`/locations/${id}`)
};