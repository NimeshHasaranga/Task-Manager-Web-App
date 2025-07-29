import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

function Login() {
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
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data?.error === 'Invalid credentials') {
        setError('User does not exist or password is incorrect');
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
      className="min-h-screen bg-gray-900 text-white p-6 pt-20"
      style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px',
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Quotes and Icons Section */}
          <div className="lg:col-span-2 space-y-12">
            <div className="flex items-center space-x-6 animate-fade-in">
              <svg
                className="w-16 h-16 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300"
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
                <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                  "Master Your Tasks, Conquer Your Goals"
                </h1>
                <p className="mt-2 text-gray-400 text-lg">
                  Stay organized and take control of your productivity.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6 animate-fade-in animation-delay-200">
              <svg
                className="w-16 h-16 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300"
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
                <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                  "Plan Today, Succeed Tomorrow"
                </h1>
                <p className="mt-2 text-gray-400 text-lg">
                  Schedule your tasks to achieve your dreams with precision.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6 animate-fade-in animation-delay-400">
              <svg
                className="w-16 h-16 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300"
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
                <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                  "Tasks Tamed, Dreams Achieved"
                </h1>
                <p className="mt-2 text-gray-400 text-lg">
                  Turn your ambitions into reality, one task at a time.
                </p>
              </div>
            </div>
          </div>
          {/* Login Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-black bg-opacity-60 p-8 rounded-xl shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 max-w-md mx-auto">
              <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Login
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;