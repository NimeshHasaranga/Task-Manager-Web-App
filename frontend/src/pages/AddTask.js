import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import Spinner from '../components/Spinner';

function AddTask() {
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Simulate loading delay (e.g., for auth check or data pre-fetching)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2-second delay for demonstration

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (successMessage) {
      // Auto-dismiss success message after 3 seconds
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer); // Cleanup on unmount or message change
    }
  }, [successMessage]);

  const handleTaskAdded = (message = 'Task added successfully!') => {
    setSuccessMessage(message);
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
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Add New Task
        </h2>
        {successMessage && (
          <div className="mb-6 max-w-md mx-auto bg-green-600 bg-opacity-20 border border-green-600 text-green-300 rounded-lg p-4 animate-fade-in relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 rounded-lg blur-xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <p className="text-base">{successMessage}</p>
              <button
                onClick={() => setSuccessMessage(null)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:from-blue-500 hover:to-blue-700 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <TaskForm onTaskAdded={handleTaskAdded} />
      </div>
    </div>
  );
}

export default AddTask;