import axios from 'axios';

// Create a pre-configured Axios instance for ReMatter API calls
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.rematter.io/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach Auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('rematter_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized access
      console.warn('Unauthorized access - token may be expired.');
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
