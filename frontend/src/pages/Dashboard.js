import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import Spinner from '../components/Spinner';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ priority: '', status: '', page: 1, sortBy: 'dueDate', order: 'asc' });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve success message from navigation state
  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
    }
  }, [location.state]);

  // Auto-dismiss success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Fetch tasks from API with retry mechanism
  const fetchTasks = async (retries = 3, delay = 1000) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      setTasks(response.data.tasks || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchTasks(retries - 1, delay * 2); // Exponential backoff
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on mount or when filters change
  useEffect(() => {
    fetchTasks();
  }, [filters, navigate]);

  // Handle task deletion with optimistic update
  const handleDelete = async (taskId) => {
    setTasks(prev => prev.filter(task => task._id !== taskId)); // Optimistic update
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage('Task successfully deleted!'); // Set message after successful DELETE
      await fetchTasks(); // Sync with backend
    } catch (error) {
      console.error('Error deleting task:', error);
      await fetchTasks(); // Refetch to sync with backend state
    }
  };

  // Handle task status toggle
  const handleToggleStatus = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const task = tasks.find(t => t._id === taskId);
      if (!task) return;
      const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchTasks();
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  // Task summary data
  const taskSummary = {
    total: tasks.length,
    pending: tasks.filter(task => task.status === 'Pending').length,
    completed: tasks.filter(task => task.status === 'Completed').length,
  };

  // Task progress percentage
  const progressPercentage = taskSummary.total > 0
    ? Math.round((taskSummary.completed / taskSummary.total) * 100)
    : 0;

  // Priority breakdown data
  const priorityBreakdown = {
    low: tasks.filter(task => task.priority === 'Low').length,
    medium: tasks.filter(task => task.priority === 'Medium').length,
    high: tasks.filter(task => task.priority === 'High').length,
  };

  // Calculate percentages for priority breakdown
  const totalPriorities = priorityBreakdown.low + priorityBreakdown.medium + priorityBreakdown.high;
  const priorityPercentages = {
    low: totalPriorities > 0 ? (priorityBreakdown.low / totalPriorities) * 100 : 0,
    medium: totalPriorities > 0 ? (priorityBreakdown.medium / totalPriorities) * 100 : 0,
    high: totalPriorities > 0 ? (priorityBreakdown.high / totalPriorities) * 100 : 0,
  };

  // Calendar data (group tasks by due date with titles)
  const getDueDates = () => {
    const dueDateMap = tasks.reduce((acc, task) => {
      const date = new Date(task.dueDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task.title);
      return acc;
    }, {});
    return Object.entries(dueDateMap).map(([date, titles]) => ({ date, titles }));
  };

  // Filter change handler
  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value, page: 1 }));
  };

  // Sort change handler
  const handleSortChange = (e) => {
    const [sortBy, order] = e.target.value.split(':');
    setFilters(prev => ({ ...prev, sortBy, order, page: 1 }));
  };

  // Page change handler
  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  if (loading) return (
    <div
      className="min-h-screen bg-gray-900 text-white flex items-center justify-center pt-20"
      style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px',
      }}
    >
      <Spinner />
    </div>
  );

  return (
    <div
      className="min-h-screen bg-gray-900 text-white p-6 pt-20"
      style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px',
      }}
    >
      <div className="container mx-auto">
        {/* Success Message */}
        {successMessage && (
          <div className="fixed top-20 right-4 max-w-sm bg-black bg-opacity-60 p-4 rounded-lg shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 animate-fade-in z-50">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 rounded-lg blur-xl"></div>
              <div className="relative flex items-center justify-between">
                <p className="text-green-400 text-base">{successMessage}</p>
                <button
                  onClick={() => setSuccessMessage('')}
                  className="p-1 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Task Dashboard
        </h2>

        {/* Widgets Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Task Summary Widget */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4">Task Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{taskSummary.total}</p>
                <p className="text-gray-400">Total Tasks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">{taskSummary.pending}</p>
                <p className="text-gray-400">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{taskSummary.completed}</p>
                <p className="text-gray-400">Completed</p>
              </div>
            </div>
          </div>

          {/* Task Progress Widget */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4">Task Progress</h3>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-gray-300 mt-2 text-center">{progressPercentage}% Completed</p>
          </div>

          {/* Priority Breakdown Widget */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4">Priority Breakdown</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${priorityPercentages.low}%` }}></div>
                </div>
                <span className="ml-2 text-gray-300">Low: {priorityBreakdown.low}</span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${priorityPercentages.medium}%` }}></div>
                </div>
                <span className="ml-2 text-gray-300">Medium: {priorityBreakdown.medium}</span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${priorityPercentages.high}%` }}></div>
                </div>
                <span className="ml-2 text-gray-300">High: {priorityBreakdown.high}</span>
              </div>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4">Upcoming Due Dates</h3>
            <ul className="space-y-2">
              {getDueDates().slice(0, 5).map(({ date, titles }, index) => (
                <li key={index} className="text-gray-300">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    <span>{date}</span>
                  </div>
                  <ul className="ml-4 mt-1 space-y-1">
                    {titles.map((title, idx) => (
                      <li key={idx} className="text-gray-400 text-sm">• {title}</li>
                    ))}
                  </ul>
                </li>
              ))}
              {getDueDates().length === 0 && (
                <p className="text-gray-400">No upcoming due dates</p>
              )}
            </ul>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="mb-8 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <select
            name="priority"
            onChange={handleFilterChange}
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            name="status"
            onChange={handleFilterChange}
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            onChange={handleSortChange}
            className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="dueDate:asc">Sort by Due Date (Asc)</option>
            <option value="dueDate:desc">Sort by Due Date (Desc)</option>
            <option value="priority:asc">Sort by Priority (Asc)</option>
            <option value="priority:desc">Sort by Priority (Desc)</option>
          </select>
        </div>

        {/* Task List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.length === 0 ? (
            <p className="text-gray-400 text-center col-span-full">No tasks found</p>
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-700 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Previous
          </button>
          <span className="text-gray-300">Page {filters.page} of {Math.ceil(total / 10)}</span>
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page * 10 >= total}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-700 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;