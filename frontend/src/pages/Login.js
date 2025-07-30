import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircleIcon, CalendarIcon, StarIcon, ClockIcon, FolderIcon, BoltIcon, ChartBarIcon, UsersIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
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
      className="min-h-screen bg-gray-900 text-white pt-20 relative overflow-hidden"
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
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-500 opacity-10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-indigo-500 opacity-10 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 animate-slide-in relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 rounded-xl blur-xl"></div>
          <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent relative z-10">
            Welcome to TaskMaster
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-gray-400 relative z-10">
            Your ultimate tool for organizing tasks and achieving goals with ease.
          </p>
        </div>
        <hr className="border-gray-700 mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
          {/* Quotes Section */}
          <div className="order-last lg:order-first space-y-10 ml-8 lg:ml-10">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Inspiration for Productivity
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 animate-fade-in">
                <CheckCircleIcon className="w-10 h-10 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300" />
                <div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold leading-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    "Master Your Tasks, Conquer Your Goals"
                  </h3>
                  <p className="mt-2 text-gray-400 text-base">
                    Stay organized and take control of your productivity.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 animate-fade-in animation-delay-200">
                <CalendarIcon className="w-10 h-10 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300" />
                <div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold leading-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    "Plan Today, Succeed Tomorrow"
                  </h3>
                  <p className="mt-2 text-gray-400 text-base">
                    Schedule your tasks to achieve your dreams with precision.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 animate-fade-in animation-delay-400">
                <StarIcon className="w-10 h-10 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300" />
                <div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold leading-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    "Tasks Tamed, Dreams Achieved"
                  </h3>
                  <p className="mt-2 text-gray-400 text-base">
                    Turn your ambitions into reality, one task at a time.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 animate-fade-in animation-delay-600">
                <ClockIcon className="w-10 h-10 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300" />
                <div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold leading-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    "Stay Focused, Stay Productive"
                  </h3>
                  <p className="mt-2 text-gray-400 text-base">
                    Keep distractions at bay with seamless task management.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Login Form */}
          <div className="order-first lg:order-last lg:sticky lg:top-20">
            <div className="bg-black bg-opacity-60 p-8 rounded-xl shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 max-w-md mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 rounded-xl blur-xl"></div>
              <div className="relative z-10">
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
                <p className="mt-6 text-center text-gray-400 text-sm">
                  Don’t have an account?{' '}
                  <a href="/register" className="text-blue-500 hover:text-blue-400 transition-colors duration-300">
                    Register now
                  </a>
                  {' '}to start organizing your tasks!
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Why TaskMaster? Section */}
        <div className="mt-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Why TaskMaster?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 animate-fade-in animation-delay-800">
              <FolderIcon className="w-10 h-10 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white">
                  Streamlined Organization
                </h3>
                <p className="mt-2 text-gray-400 text-base">
                  Keep all your tasks in one place with intuitive categorization and prioritization.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in animation-delay-1000">
              <BoltIcon className="w-10 h-10 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white">
                  Boosted Productivity
                </h3>
                <p className="mt-2 text-gray-400 text-base">
                  Focus on what matters most with tools to track progress and meet deadlines.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in animation-delay-1200">
              <CheckCircleIcon className="w-10 h-10 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white">
                  Goal Achievement
                </h3>
                <p className="mt-2 text-gray-400 text-base">
                  Turn your vision into reality with clear task management and progress insights.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in animation-delay-1400">
              <ChartBarIcon className="w-10 h-10 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white">
                  Easy Task Creation
                </h3>
                <p className="mt-2 text-gray-400 text-base">
                  Add and edit tasks quickly with a user-friendly form.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in animation-delay-1600">
              <ChartBarIcon className="w-10 h-10 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white">
                  Advanced Filtering & Sorting
                </h3>
                <p className="mt-2 text-gray-400 text-base">
                  Organize tasks by priority, status, or due date with ease.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in animation-delay-1800">
              <ChartBarIcon className="w-10 h-10 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white">
                  Progress Tracking
                </h3>
                <p className="mt-2 text-gray-400 text-base">
                  Visualize your progress with intuitive dashboards and widgets.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in animation-delay-2000">
              <ClockIcon className="w-10 h-10 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white">
                  Task Reminders
                </h3>
                <p className="mt-2 text-gray-400 text-base">
                  Stay on track with automated reminders for upcoming deadlines.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in animation-delay-2200">
              <UsersIcon className="w-10 h-10 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white">
                  Collaboration Tools
                </h3>
                <p className="mt-2 text-gray-400 text-base">
                  Share and manage tasks seamlessly with your team.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in animation-delay-2400">
              <AdjustmentsHorizontalIcon className="w-10 h-10 text-blue-500 opacity-70 hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white">
                  Customizable Dashboards
                </h3>
                <p className="mt-2 text-gray-400 text-base">
                  Personalize your task views for maximum efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Section */}
        <footer className="mt-12 py-6 text-center border-t border-gray-700">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="/about" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
              About
            </a>
            <a href="/contact" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
              Contact
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
              Terms of Service
            </a>
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            <a href="https://twitter.com" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 4.308 1.784 9.165 1.418 12 0 1.643-.936 2.865-2.474 3.385-4.174.524-1.705.234-3.529-1-4.826-1.125.486-2.287.834-3.5 1.002 1.13-1.138 1.781-2.682 1.865-4.297A9.315 9.315 0 0122 4.01z" />
              </svg>
            </a>
            <a href="https://facebook.com" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Login;