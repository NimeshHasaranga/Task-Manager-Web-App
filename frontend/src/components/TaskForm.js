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
      navigate('/');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          {isEdit ? 'Edit Task' : 'Add Task'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Due Time</label>
            <input
              type="time"
              name="dueTime"
              value={formData.dueTime}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            {isEdit ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;