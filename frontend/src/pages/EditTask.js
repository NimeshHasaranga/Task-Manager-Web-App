import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskForm from '../components/TaskForm';

function EditTask() {
  const [task, setTask] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
        navigate('/');
      }
    };

    fetchTask();
  }, [id, navigate]);

  if (!task) return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-2xl text-gray-300">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Edit Task
        </h2>
        <TaskForm task={task} isEdit />
      </div>
    </div>
  );
}

export default EditTask;