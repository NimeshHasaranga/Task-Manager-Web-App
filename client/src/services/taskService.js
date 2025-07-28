import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
    throw new Error('Authentication token not found');
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

export default {
  createTask: async (taskData) => {
    try {
      console.log('Creating task with data:', taskData);
      const config = getAuthHeader();
      const response = await axios.post(`${API_URL}/tasks`, taskData, config);
      console.log('Task created successfully:', response.data);
      return response;
    } catch (error) {
      console.error('Error in taskService.createTask:', error);
      if (error.response && error.response.status === 401) {
        console.error('Authentication failed - redirecting to login');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw error;
    }
  },
  // ... other methods
};