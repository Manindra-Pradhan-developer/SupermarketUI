import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const AuthContext = createContext();

// AuthProvider: Focuses on providing context without navigation
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage if available
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (credentials) => {
    // API call to login
    await api.post('/auth/login', credentials);
    // No navigation here; handled by AuthNavigator
  };

  const verifyOtp = async (otpData) => {
    const response = await api.post('/auth/verify-otp', otpData);
    const { token } = response.data;
    localStorage.setItem('token', token);
    setUser({ token });
    // No navigation here; handled by AuthNavigator
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // No navigation here; handled by AuthNavigator
  };

  return (
    <AuthContext.Provider value={{ user, login, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthNavigator: Handles navigation within Router context
export const AuthNavigator = ({ children }) => {
  const navigate = useNavigate();
  const { user, login, verifyOtp, logout } = useContext(AuthContext);

  // Enhanced login with navigation
  const handleLogin = async (credentials) => {
    await login(credentials);
    navigate('/otp-verification');
  };

  // Enhanced verifyOtp with navigation
  const handleVerifyOtp = async (otpData) => {
    await verifyOtp(otpData);
    if (user) { // Check if user is set after OTP verification
      navigate('/dashboard');
    }
  };

  // Enhanced logout with navigation
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Optional: Redirect if no user on protected routes
  useEffect(() => {
    if (!user && window.location.pathname !== '/login' && window.location.pathname !== '/otp-verification') {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, verifyOtp: handleVerifyOtp, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};