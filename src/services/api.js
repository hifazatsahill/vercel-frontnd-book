import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth token and redirect to login
      localStorage.removeItem('access_token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API endpoints
export const bookAPI = {
  getChapters: () => api.get('/api/book/chapters'),
  getChapter: (slug) => api.get(`/api/book/chapters/${slug}`),
  search: (query) => api.get(`/api/book/search`, { params: { query } }),
};

export const authAPI = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
  logout: () => api.post('/api/auth/logout'),
  getProfile: () => api.get('/api/auth/profile'),
  updateProfile: (profileData) => api.put('/api/auth/profile', profileData),
};

export const chatAPI = {
  query: (data) => api.post('/api/chat/query', data),
  querySelected: (data) => api.post('/api/chat/query-selected', data),
  getSessions: () => api.get('/api/chat/sessions'),
  getSessionMessages: (sessionId) => api.get(`/api/chat/sessions/${sessionId}/messages`),
};

export const userAPI = {
  personalizeChapter: (data) => api.post('/api/personalize/chapter', data),
  translateChapter: (data) => api.post('/api/translate/chapter', data),
  getProgress: () => api.get('/api/user/progress'),
  updateProgress: (data) => api.put('/api/user/progress', data),
};