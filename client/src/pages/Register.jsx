import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Alert from '../components/Alert';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create account');
      console.error(err);
    }
    setLoading(false);
  };

  // Inline styles
  const styles = {
    pageContainer: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9fafb',
      padding: '3rem 1rem'
    },
    formContainer: {
      maxWidth: '28rem',
      width: '100%',
      margin: '0 auto'
    },
    heading: {
      marginTop: '1.5rem',
      fontSize: '1.875rem',
      fontWeight: '800',
      color: '#111827',
      textAlign: 'center'
    },
    subtext: {
      marginTop: '0.5rem',
      fontSize: '0.875rem',
      color: '#4b5563',
      textAlign: 'center'
    },
    form: {
      marginTop: '2rem'
    },
    inputGroup: {
      borderRadius: '0.375rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      marginBottom: '1rem'
    },
    input: {
      appearance: 'none',
      position: 'relative',
      display: 'block',
      width: '100%',
      padding: '0.5rem 0.75rem',
      border: '1px solid #d1d5db',
      color: '#111827',
      backgroundColor: '#fff',
      marginBottom: '0.5rem'
    },
    button: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: '0.5rem 1rem',
      border: '1px solid transparent',
      fontSize: '0.875rem',
      fontWeight: '500',
      borderRadius: '0.375rem',
      color: '#fff',
      backgroundColor: '#2563eb',
      cursor: 'pointer',
      marginTop: '1rem'
    },
    buttonHover: {
      backgroundColor: '#1d4ed8'
    },
    buttonDisabled: {
      opacity: '0.5'
    },
    errorText: {
      color: '#dc2626',
      fontSize: '0.875rem',
      marginBottom: '1rem',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={styles.heading}>Create a new account</h2>
          <p style={styles.subtext}>
            Or{' '}
            <Link
              to="/login"
              style={{
                fontWeight: '500',
                color: '#2563eb',
                textDecoration: 'none'
              }}
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        {error && <Alert type="error" message={error} />}

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <div>
              <label htmlFor="name" style={{ display: 'none' }}>
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                style={{
                  ...styles.input,
                  borderRadius: '0.375rem 0.375rem 0 0'
                }}
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" style={{ display: 'none' }}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                style={styles.input}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" style={{ display: 'none' }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                style={styles.input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" style={{ display: 'none' }}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                style={{
                  ...styles.input,
                  borderRadius: '0 0 0.375rem 0.375rem'
                }}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {}),
                ':hover': !loading ? styles.buttonHover : {}
              }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;