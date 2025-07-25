import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Task Manager</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white">Dashboard</Link>
          <Link to="/add-task" className="text-white">Add Task</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;