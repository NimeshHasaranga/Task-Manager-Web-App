import { Link } from 'react-router-dom';

const TaskItem = ({ task, onDelete }) => {
  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800'
  };

  const statusColors = {
    Completed: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
          <div className="mt-2 flex space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${statusColors[task.status]}`}>
              {task.status}
            </span>
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/edit-task/${task._id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;