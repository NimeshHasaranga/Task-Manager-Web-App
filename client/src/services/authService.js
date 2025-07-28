import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

export default {
  login: (email, password) => {
    return axios.post(`${API_URL}/auth/login`, { email, password });
  },
  register: (name, email, password) => {
    return axios.post(`${API_URL}/auth/register`, { name, email, password });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  }
};