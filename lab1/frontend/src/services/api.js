const API_BASE = 'http://127.0.0.1:8080/inflab/api';

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

    // Для DELETE запросов может не быть тела
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

// Сервисы для каждой сущности
export const dragonService = {
  getAll: () => api.get('/dragons'),
  getById: (id) => api.get(`/dragons/${id}`),
  create: (dragon) => api.post('/dragons', dragon),
  update: (id, dragon) => api.put(`/dragons/${id}`, dragon),
  delete: (id) => api.delete(`/dragons/${id}`),
  findByColor: (color) => api.get(`/dragons/color/${color}`),
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


export const dataTransformers = {
  // Для создания/обновления дракона - отправляем только ID связанных объектов
  toDragonRequest(dragonData) {
    return {
      name: dragonData.name,
      age: dragonData.age,
      weight: dragonData.weight,
      color: dragonData.color,
      character: dragonData.character,
      coordinates: dragonData.coordinates ? { id: dragonData.coordinates.id } : null,
      cave: dragonData.cave ? { id: dragonData.cave.id } : null,
      killer: dragonData.killer ? { id: dragonData.killer.id } : null,
      head: dragonData.head ? { id: dragonData.head.id } : null
    };
  },

  // Для создания coordinates
  toCoordinatesRequest(coordinatesData) {
    return {
      x: coordinatesData.x,
      y: coordinatesData.y
    };
  },

  // Для создания cave
  toCaveRequest(caveData) {
    return {
      numberOfTreasures: caveData.numberOfTreasures
    };
  },

  // Для создания person
  toPersonRequest(personData) {
    return {
      name: personData.name,
      eyeColor: personData.eyeColor,
      hairColor: personData.hairColor,
      height: personData.height,
      nationality: personData.nationality,
      location: personData.location ? { id: personData.location.id } : null
    };
  },

  // Для создания head
  toHeadRequest(headData) {
    return {
      size: headData.size,
      eyesCount: headData.eyesCount
    };
  }
};