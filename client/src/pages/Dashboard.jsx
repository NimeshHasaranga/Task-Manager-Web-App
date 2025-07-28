import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskItem from '../components/TaskItem';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import taskService from '../services/taskService';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sort: '-createdAt'
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data } = await taskService.getTasks(filters);
        setTasks(data || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 
                'Failed to fetch tasks. Please check your connection.');
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
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
        <Link
          to="/add-task"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </Link>
      </div>

      {/* Filter controls same as before */}
      
      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found. Add a new task to get started!</p>
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