import TaskForm from '../components/TaskForm';

function AddTask() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
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