import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';

// Validation schema
const taskSchema = yup.object().shape({
  title: yup.string().required('Title is required').max(50, 'Title must be at most 50 characters'),
  description: yup.string().required('Description is required').max(500, 'Description must be at most 500 characters'),
  dueDate: yup.date().required('Due date is required').min(new Date(), 'Due date must be in the future'),
  priority: yup.string().required('Priority is required').oneOf(['Low', 'Medium', 'High']),
});

const AddTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      priority: 'Medium'
    }
  });

  const createTask = async (taskData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1'}/tasks`,
        taskData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response;
    } catch (error) {
      console.error('API Error:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Format dueDate for backend
      const taskData = {
        ...data,
        dueDate: new Date(data.dueDate).toISOString()
      };

      console.log('Submitting task data:', taskData);

      const response = await createTask(taskData);
      console.log('API response:', response);

      if (response && response.status === 201) {
        setSuccess('Task created successfully!');
        reset();
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        stack: err.stack
      });

      let errorMessage = 'Failed to create task';
      
      if (err.response) {
        // Server responded with error status
        if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.status === 401) {
          errorMessage = 'Session expired. Please login again.';
        } else if (err.response.status === 400) {
          errorMessage = 'Invalid task data. Please check your inputs.';
        } else if (err.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = `Server error (${err.response.status})`;
        }
      } else if (err.request) {
        // Request was made but no response
        errorMessage = 'Network error. Check your connection and try again.';
      } else {
        // Other errors
        errorMessage = err.message || 'Error submitting task';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="add-task-container">
      <div className="add-task-card">
        <div className="add-task-header">
          <h1>Add New Task</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="back-button"
          >
            Back to Dashboard
          </button>
        </div>

        {error && (
          <div className="alert-error">
            {error}
            <button onClick={() => setError(null)} className="alert-close">
              &times;
            </button>
          </div>
        )}

        {success && (
          <div className="alert-success">
            {success}
            <button onClick={() => setSuccess(null)} className="alert-close">
              &times;
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="add-task-form">
          <div className="form-group">
            <label htmlFor="title">
              Title *
            </label>
            <input
              id="title"
              type="text"
              {...register('title')}
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="error-message">{errors.title.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description *
            </label>
            <textarea
              id="description"
              rows={4}
              {...register('description')}
              className={`form-textarea ${errors.description ? 'input-error' : ''}`}
              placeholder="Enter task description"
            />
            {errors.description && (
              <p className="error-message">{errors.description.message}</p>
            )}
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="dueDate">
                Due Date *
              </label>
              <input
                id="dueDate"
                type="datetime-local"
                {...register('dueDate')}
                className={`form-input ${errors.dueDate ? 'input-error' : ''}`}
                min={new Date().toISOString().slice(0, 16)}
              />
              {errors.dueDate && (
                <p className="error-message">{errors.dueDate.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="priority">
                Priority *
              </label>
              <select
                id="priority"
                {...register('priority')}
                className={`form-select ${errors.priority ? 'input-error' : ''}`}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {errors.priority && (
                <p className="error-message">{errors.priority.message}</p>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating...
                </>
              ) : 'Create Task'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .add-task-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        .add-task-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }

        .add-task-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 1rem;
        }

        .add-task-header h1 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }

        .back-button {
          background: none;
          border: none;
          color: #4a5568;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .back-button:hover {
          color: #2b6cb0;
          text-decoration: underline;
        }

        .alert-error {
          background-color: #fee2e2;
          border: 1px solid #fca5a5;
          color: #b91c1c;
          padding: 1rem;
          border-radius: 0.375rem;
          margin-bottom: 1rem;
          position: relative;
        }

        .alert-success {
          background-color: #dcfce7;
          border: 1px solid #86efac;
          color: #166534;
          padding: 1rem;
          border-radius: 0.375rem;
          margin-bottom: 1rem;
          position: relative;
        }

        .alert-close {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          color: inherit;
        }

        .add-task-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #4a5568;
        }

        .form-input, .form-textarea, .form-select {
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          font-size: 1rem;
        }

        .form-input:focus, .form-textarea:focus, .form-select:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .input-error {
          border-color: #e53e3e;
        }

        .input-error:focus {
          border-color: #e53e3e;
          box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.2);
        }

        .error-message {
          color: #e53e3e;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
          margin-top: 1rem;
        }

        .cancel-button {
          padding: 0.5rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          background: white;
          color: #4a5568;
          cursor: pointer;
        }

        .cancel-button:hover {
          background: #f7fafc;
        }

        .submit-button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          background: #4299e1;
          color: white;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .submit-button:hover {
          background: #3182ce;
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 0.5rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AddTask;