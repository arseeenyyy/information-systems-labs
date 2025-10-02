const API_BASE = 'http://localhost:8080/inflab/api';

const api = {
  async request(url, options = {}) {
    const response = await fetch(`${API_BASE}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  },

  get(url) {
    return this.request(url);
  },

  post(url, data) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put(url, data) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(url) {
    return this.request(url, {
      method: 'DELETE',
    });
  },
};

export const dragonService = {
  getAll: () => api.get('/dragons'),
  getById: (id) => api.get(`/dragons/${id}`),
  create: (dragon) => api.post('/dragons', dragon),
  update: (id, dragon) => api.put(`/dragons/${id}`, dragon),
  delete: (id) => api.delete(`/dragons/${id}`),
  findByColor: (color) => api.get(`/dragons/color/${color}`),
  // Добавляем специальные операции
  deleteAllByColor: (color) => api.delete(`/dragons/color/${color}/all`),
  deleteOneByColor: (color) => api.delete(`/dragons/color/${color}/one`),
  findByNameStartingWith: (substring) => api.get(`/dragons/name-starts-with/${substring}`),
};

export const coordinatesService = {
  getAll: () => api.get('/coordinates'),
  getById: (id) => api.get(`/coordinates/${id}`),
  create: (coordinates) => api.post('/coordinates', coordinates),
  update: (id, coordinates) => api.put(`/coordinates/${id}`, coordinates),
  delete: (id) => api.delete(`/coordinates/${id}`),
};

export const caveService = {
  getAll: () => api.get('/caves'),
  getById: (id) => api.get(`/caves/${id}`),
  create: (cave) => api.post('/caves', cave),
  update: (id, cave) => api.put(`/caves/${id}`, cave),
  delete: (id) => api.delete(`/caves/${id}`),
};

export const personService = {
  getAll: () => api.get('/persons'),
  getById: (id) => api.get(`/persons/${id}`),
  create: (person) => api.post('/persons', person),
  update: (id, person) => api.put(`/persons/${id}`, person),
  delete: (id) => api.delete(`/persons/${id}`),
  findByEyeColor: (color) => api.get(`/persons/eye-color/${color}`),
};

export const headService = {
  getAll: () => api.get('/heads'),
  getById: (id) => api.get(`/heads/${id}`),
  create: (head) => api.post('/heads', head),
  update: (id, head) => api.put(`/heads/${id}`, head),
  delete: (id) => api.delete(`/heads/${id}`),
};

export const locationService = {
  getAll: () => api.get('/locations'),
  getById: (id) => api.get(`/locations/${id}`),
  create: (location) => api.post('/locations', location),
  update: (id, location) => api.put(`/locations/${id}`, location),
  delete: (id) => api.delete(`/locations/${id}`),
};
