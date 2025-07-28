import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export default {
  getTasks: (filters) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.sort) params.append('sort', filters.sort);
    
    return axios.get(`${API_URL}/tasks?${params.toString()}`, getAuthHeader());
  },
  deleteTask: (taskId) => axios.delete(`${API_URL}/tasks/${taskId}`, getAuthHeader()),
  // Add other task-related methods here
};