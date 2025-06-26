import axios from 'axios';

const api = axios.create({
  baseURL: 'https://healthlens-backend.onrender.com',
});

export default api;
