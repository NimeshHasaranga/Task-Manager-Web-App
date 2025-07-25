import { useState } from 'react';
import { Link } from 'react-router-dom';
import useTasks from '../hooks/useTasks';
import TaskItem from '../components/TaskItem';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

const Dashboard = () => {
  const [filters, setLocalFilters] = useState({
    status: '',
    priority: '',
    sort: '-createdAt'
  });
  
  const { 
    tasks = [], 
    loading, 
    error, 
    setFilters: setTasksFilters,
    remove 
  } = useTasks(filters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setLocalFilters(newFilters);
    setTasksFilters(newFilters);
  };

  if (loading) return <Spinner />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
        <Link
          to="/add-task"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
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
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found. Add a new task to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onDelete={() => remove(task._id)} 
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;