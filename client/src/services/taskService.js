import axios from 'axios';

const API_URL = '/api/v1/tasks';

// Get all tasks
const getTasks = async (filters) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    params: filters
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get single task
const getTask = async (taskId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  const response = await axios.get(`${API_URL}/${taskId}`, config);
  return response.data;
};

// Create new task
const createTask = async (taskData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  const response = await axios.post(API_URL, taskData, config);
  return response.data;
};

// Update task
const updateTask = async (taskId, taskData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  const response = await axios.put(`${API_URL}/${taskId}`, taskData, config);
  return response.data;
};

// Delete task
const deleteTask = async (taskId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  const response = await axios.delete(`${API_URL}/${taskId}`, config);
  return response.data;
};

const taskService = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};

export default taskService;