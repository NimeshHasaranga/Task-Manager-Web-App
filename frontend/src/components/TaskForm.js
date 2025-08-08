import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskForm({ task, isEdit }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    dueTime: task?.dueDate ? new Date(task.dueDate).toISOString().slice(11, 16) : '',
    priority: task?.priority || 'Low',
  });
  const navigate = useNavigate();

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Combine dueDate and dueTime into a single ISO date string
      const combinedDueDate = formData.dueDate && formData.dueTime
        ? new Date(`${formData.dueDate}T${formData.dueTime}:00`).toISOString()
        : formData.dueDate
        ? new Date(`${formData.dueDate}T00:00:00`).toISOString()
        : null;

      const payload = {
        title: formData.title,
        description: formData.description,
        dueDate: combinedDueDate,
        priority: formData.priority,
      };

      const url = isEdit
        ? `http://localhost:5000/api/tasks/${task._id}`
        : 'http://localhost:5000/api/tasks';
      const method = isEdit ? 'put' : 'post';
      await axios[method](url, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate('/', { state: { successMessage: isEdit ? 'Task successfully updated!' : 'Task successfully added!' } });
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-black bg-opacity-60 p-8 rounded-xl shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 max-w-lg mx-auto">
        <h2 className="text-2xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {isEdit ? 'Edit Task' : 'Add Task'}
        </h2>
        <div className="space-y-6">
          <div className="relative">
            <label className="block text-gray-300 text-sm font-medium mb-1 transition-all duration-300">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700"
              required
              placeholder="Enter task title"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-300 text-sm font-medium mb-1 transition-all duration-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700"
              rows="4"
              placeholder="Enter task description (optional)"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-300 text-sm font-medium mb-1 transition-all duration-300">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={today}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-gray-300 text-sm font-medium mb-1 transition-all duration-300">
              Due Time
            </label>
            <input
              type="time"
              name="dueTime"
              value={formData.dueTime}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-300 text-sm font-medium mb-1 transition-all duration-300">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700 appearance-none"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <svg
              className="absolute right-3 top-10 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:from-blue-500 hover:to-blue-700 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-300"
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
                d={isEdit ? 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15.828H9v-2.828l8.586-8.586z' : 'M12 4v16m8-8H4'}
              />
            </svg>
            <span>{isEdit ? 'Update Task' : 'Add Task'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;