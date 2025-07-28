import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors consistently
const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error.response?.data?.message || error.message;
  }
};

export default {
  getTasks: (filters) => handleRequest(() => api.get('/tasks', { params: filters })),
  createTask: (taskData) => handleRequest(() => api.post('/tasks', taskData)),
  updateTask: (id, taskData) => handleRequest(() => api.put(`/tasks/${id}`, taskData)),
  deleteTask: (id) => handleRequest(() => api.delete(`/tasks/${id}`)),
};