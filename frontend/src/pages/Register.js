import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.data?.error === 'User already exists') {
        setError('This email is already registered. Please use a different email.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
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
      className="min-h-screen bg-gray-900 text-white p-6 pt-20 relative overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px',
      }}
    >
      {/* Background Overlays */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Quotes, Benefits, and Features Section */}
          <div className="space-y-12 order-last lg:order-first">
            {/* Quotes Section */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Inspiration for Productivity
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 animate-fade-in">
                  <svg
                    className="w-12 h-12 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12l2 2 4-4M7.835 4.697a3.5 3.5 0 015.33 0l.335.334a3.5 3.5 0 005 0l.5-.5a3.5 3.5 0 015 5l-6.5 6.5a3.5 3.5 0 01-5 0l-.335-.334a3.5 3.5 0 00-5 0l-6.5 6.5a3.5 3.5 0 01-5-5l6.5-6.5z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-extrabold leading-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                      "Master Your Tasks, Conquer Your Goals"
                    </h3>
                    <p className="mt-2 text-gray-400 text-base">
                      Stay organized and take control of your productivity.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 animate-fade-in animation-delay-200">
                  <svg
                    className="w-12 h-12 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-extrabold leading-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                      "Plan Today, Succeed Tomorrow"
                    </h3>
                    <p className="mt-2 text-gray-400 text-base">
                      Schedule your tasks to achieve your dreams with precision.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 animate-fade-in animation-delay-400">
                  <svg
                    className="w-12 h-12 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-extrabold leading-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                      "Tasks Tamed, Dreams Achieved"
                    </h3>
                    <p className="mt-2 text-gray-400 text-base">
                      Turn your ambitions into reality, one task at a time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-gray-700" />
            {/* Benefits Section */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Why Use Our Task Manager?
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 animate-fade-in animation-delay-600">
                  <svg
                    className="w-12 h-12 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-semibold text-white">
                      Streamlined Organization
                    </h3>
                    <p className="mt-2 text-gray-400 text-base">
                      Keep all your tasks in one place with intuitive categorization and prioritization.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 animate-fade-in animation-delay-800">
                  <svg
                    className="w-12 h-12 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-semibold text-white">
                      Boosted Productivity
                    </h3>
                    <p className="mt-2 text-gray-400 text-base">
                      Focus on what matters most with tools to track progress and meet deadlines.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 animate-fade-in animation-delay-1000">
                  <svg
                    className="w-12 h-12 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-semibold text-white">
                      Goal Achievement
                    </h3>
                    <p className="mt-2 text-gray-400 text-base">
                      Turn your vision into reality with clear task management and progress insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-gray-700" />
            {/* Features Section */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Key Features
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 animate-fade-in animation-delay-1200">
                  <svg
                    className="w-12 h-12 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-semibold text-white">
                      Easy Task Creation
                    </h3>
                    <p className="mt-2 text-gray-400 text-base">
                      Add and edit tasks quickly with a user-friendly form.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 animate-fade-in animation-delay-1400">
                  <svg
                    className="w-12 h-12 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1m-7 8H3m10 8H3m18-8h-6m6 8h-6"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-semibold text-white">
                      Advanced Filtering & Sorting
                    </h3>
                    <p className="mt-2 text-gray-400 text-base">
                      Organize tasks by priority, status, or due date with ease.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 animate-fade-in animation-delay-1600">
                  <svg
                    className="w-12 h-12 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V13a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-semibold text-white">
                      Progress Tracking
                    </h3>
                    <p className="mt-2 text-gray-400 text-base">
                      Visualize your progress with intuitive dashboards and widgets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Register Form Section */}
          <div className="order-first lg:order-last lg:sticky lg:top-20">
            <div className="bg-black bg-opacity-60 p-8 rounded-xl shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 max-w-md mx-auto">
              <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Register
              </h2>
              {error && (
                <div className="mb-4 p-3 bg-red-600 bg-opacity-20 border border-red-600 text-red-300 rounded-lg">
                  {error}
                </div>
              )}
              <div className="space-y-6">
                <div className="relative">
                  <label className="block text-gray-300 text-sm font-medium mb-1 transition-all duration-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700"
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="relative">
                  <label className="block text-gray-300 text-sm font-medium mb-1 transition-all duration-300">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700"
                    required
                    placeholder="Enter your password"
                  />
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
                      d="M18 9v3m0 0v3m0-3h-3m3 0h3m-9-6h.01M4 4h7a3 3 0 013 3v10a3 3 0 01-3 3H4a3 3 0 01-3-3V7a3 3 0 013-3z"
                    />
                  </svg>
                  <span>Register</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;