import { useState, useEffect } from 'react';
import taskService from '../services/taskService';

const useTasks = (initialFilters = {}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data } = await taskService.getTasks(filters);
        setTasks(data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filters]);

  const refetch = async () => {
    try {
      setLoading(true);
      const { data } = await taskService.getTasks(filters);
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const create = async (taskData) => {
    try {
      const { data } = await taskService.createTask(taskData);
      setTasks([...tasks, data]);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const update = async (taskId, taskData) => {
    try {
      const { data } = await taskService.updateTask(taskId, taskData);
      setTasks(tasks.map(task => task._id === taskId ? data : task));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const remove = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    filters,
    setFilters,
    refetch,
    create,
    update,
    remove
  };
};

export default useTasks;