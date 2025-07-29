import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import Spinner from '../components/Spinner';

function AddTask() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., for auth check or data pre-fetching)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2-second delay for demonstration

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

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
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Add New Task
        </h2>
        <TaskForm />
      </div>
    </div>
  );
}

export default AddTask;