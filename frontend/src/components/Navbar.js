import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 p-4 shadow-lg border-b border-gray-700 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:text-blue-400 transition-colors duration-300"
        >
          Task Master
        </Link>
        <div className="flex space-x-4 items-center">
          {token ? (
            <>
              <Link
                to="/add-task"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:from-blue-500 hover:to-blue-700 hover:scale-105 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Add Task</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold hover:from-red-500 hover:to-red-700 hover:scale-105 hover:shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-300"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 px-5 py-2.5 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-300 px-5 py-2.5 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;