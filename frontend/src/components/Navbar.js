import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:text-blue-400 transition-colors duration-300"
        >
          Task Manager
        </Link>
        <div className="flex space-x-4">
          {token ? (
            <>
              <Link
                to="/add-task"
                className="text-gray-300 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                Add Task
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-300 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
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