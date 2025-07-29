import { Link } from 'react-router-dom';
import axios from 'axios';

function TaskCard({ task, onDelete, onToggleStatus }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      onDelete(task._id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleStatus = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        status: task.status === 'Pending' ? 'Completed' : 'Pending',
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      onToggleStatus(task._id);
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const priorityColors = {
    Low: 'bg-green-500 text-white',
    Medium: 'bg-yellow-500 text-white',
    High: 'bg-red-500 text-white',
  };

  return (
    <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105">
      <h3 className="text-xl font-bold text-white mb-2">{task.title}</h3>
      <p className="text-gray-300 mb-2">{task.description || 'No description'}</p>
      <p className="text-gray-400 mb-2">Due: {new Date(task.dueDate).toLocaleString()}</p>
      <p className="text-gray-400 mb-2">
        Priority: <span className={`px-3 py-1 rounded-full ${priorityColors[task.priority]}`}>{task.priority}</span>
      </p>
      <p className="text-gray-400 mb-4">Status: {task.status}</p>
      <div className="flex space-x-2">
        <button
          onClick={handleToggleStatus}
          className={`px-4 py-2 rounded ${task.status === 'Pending' ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'} text-white transition-colors`}
        >
          {task.status === 'Pending' ? 'Mark Completed' : 'Mark Pending'}
        </button>
        <Link to={`/edit-task/${task._id}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Edit
        </Link>
        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;