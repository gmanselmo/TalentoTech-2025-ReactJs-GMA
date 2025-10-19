import axios from 'axios';

const SECRET_KEY = 'talentoTech2025ReactJs';

const apiClient = axios.create({
  baseURL: 'https://talentotech2025-backend.gmatdev.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = SECRET_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiClient;
