import axios from 'axios';

const api = axios.create({
  baseURL: 'https://prueba-vue-beta.vercel.app',
  withCredentials: true, // Permite el envío de cookies
});

export default api;

