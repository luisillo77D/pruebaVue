import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tasksback-vld2.onrender.com',
  withCredentials: true, // Permite el envío de cookies
});

export default api;

