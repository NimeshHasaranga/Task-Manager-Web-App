import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Alert from '../components/Alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to log in');
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
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    },
    input: {
      appearance: 'none',
      position: 'relative',
      display: 'block',
      width: '100%',
      padding: '0.5rem 0.75rem',
      border: '1px solid #d1d5db',
      color: '#111827',
      backgroundColor: '#fff'
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
      cursor: 'pointer'
    },
    buttonHover: {
      backgroundColor: '#1d4ed8'
    },
    buttonDisabled: {
      opacity: '0.5'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={styles.heading}>Sign in to your account</h2>
          <p style={styles.subtext}>
            Or{' '}
            <Link
              to="/register"
              style={{
                fontWeight: '500',
                color: '#2563eb'
              }}
            >
              create a new account
            </Link>
          </p>
        </div>

        {error && <Alert type="error" message={error} />}

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'none' }}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                style={{
                  ...styles.input,
                  borderRadius: '0.375rem 0.375rem 0 0'
                }}
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
                autoComplete="current-password"
                required
                style={{
                  ...styles.input,
                  borderRadius: '0 0 0.375rem 0.375rem'
                }}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '1.5rem 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                style={{
                  height: '1rem',
                  width: '1rem',
                  color: '#2563eb',
                  borderColor: '#d1d5db',
                  borderRadius: '0.25rem'
                }}
              />
              <label
                htmlFor="remember-me"
                style={{
                  marginLeft: '0.5rem',
                  display: 'block',
                  fontSize: '0.875rem',
                  color: '#111827'
                }}
              >
                Remember me
              </label>
            </div>

            <div style={{ fontSize: '0.875rem' }}>
              <Link
                to="/forgot-password"
                style={{
                  fontWeight: '500',
                  color: '#2563eb'
                }}
              >
                Forgot your password?
              </Link>
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
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;