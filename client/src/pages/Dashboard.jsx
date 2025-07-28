import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskItem from '../components/TaskItem';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import taskService from '../services/taskService';
import authService from '../services/authService';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sort: '-createdAt'
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data } = await taskService.getTasks(filters);
        setTasks(data.data || []);
        setError(null);
      } catch (err) {
        if (err.response?.status === 401) {
          authService.logout();
          navigate('/login');
        } else {
          setError(err.response?.data?.message || 
                  'Failed to fetch tasks. Please check your connection.');
        }
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filters, navigate]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      if (err.response?.status === 401) {
        authService.logout();
        navigate('/login');
      } else {
        setError('Failed to delete task');
      }
    }
  };

  if (loading) return <Spinner />;
  
  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <Alert type="error" message={error} />
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
        <div className="flex space-x-4">
          <Link
            to="/add-task"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Task
          </Link>
          <button
            onClick={() => {
              authService.logout();
              navigate('/login');
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="-createdAt">Newest First</option>
              <option value="createdAt">Oldest First</option>
              <option value="dueDate">Due Date (Asc)</option>
              <option value="-dueDate">Due Date (Desc)</option>
              <option value="priority">Priority (Low to High)</option>
              <option value="-priority">Priority (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">No tasks found. Add a new task to get started!</p>
          <Link
            to="/add-task"
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Your First Task
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onDelete={() => handleDelete(task._id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;