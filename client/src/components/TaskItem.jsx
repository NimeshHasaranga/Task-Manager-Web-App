import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800'
};

const statusColors = {
  Pending: 'bg-blue-100 text-blue-800',
  Completed: 'bg-gray-100 text-gray-800'
};

const TaskItem = ({ task, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
          
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${statusColors[task.status]}`}>
              {task.status}
            </span>
            <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
              Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
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