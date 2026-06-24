import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data: any) => API.post('/auth/register', data),
  login: (email: string, password: string) => API.post('/auth/login', { email, password }),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// User APIs
export const userAPI = {
  getProfile: () => API.get('/users/profile'),
  updateProfile: (data: any) => API.put('/users/profile', data),
};

// Score APIs
export const scoreAPI = {
  getLatestScore: () => API.get('/score/latest'),
  calculateScore: (data: any) => API.post('/score/calculate', data),
  getHistory: () => API.get('/score/history'),
};

// Loan APIs
export const loanAPI = {
  getEligibility: () => API.get('/loans/eligibility'),
  applyForLoan: (data: any) => API.post('/loans/apply', data),
};

export default API;
