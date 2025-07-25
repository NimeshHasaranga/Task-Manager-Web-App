import axios from 'axios';

const API_URL = '/api/v1/auth';

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  
  if (response.data) {
    localStorage.setItem('token', response.data.token);
  }
  
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  
  if (response.data) {
    localStorage.setItem('token', response.data.token);
  }
  
  return response.data;
};

// Get user data
const getMe = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  const response = await axios.get(`${API_URL}/me`, config);
  return response.data;
};

const authService = {
  register,
  login,
  getMe
};

export default authService;