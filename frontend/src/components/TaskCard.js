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
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-white font-semibold transition-all duration-300 ${
            task.status === 'Pending'
              ? 'bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 hover:shadow-[0_0_10px_rgba(34,197,94,0.5)] hover:scale-105'
              : 'bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700 hover:shadow-[0_0_10px_rgba(234,179,8,0.5)] hover:scale-105'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>{task.status === 'Pending' ? 'Mark Completed' : 'Mark Pending'}</span>
        </button>
        <Link
          to={`/edit-task/${task._id}`}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:from-blue-500 hover:to-blue-700 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15.828H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span>Edit</span>
        </Link>
        <button
          onClick={handleDelete}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold hover:from-red-500 hover:to-red-700 hover:shadow-[0_0_10px_rgba(239,68,68,0.5)] hover:scale-105 transition-all duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

export default TaskCard;