import { defineStore } from 'pinia';
import api from '@/utils/api';
import type { User } from '@/types/User';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),

  actions: {
    async verifyAuth() {
      try {
        const { data } = await api.get('/api/verify'); 
        this.user = data;
        this.isAuthenticated = true;
        return true;
      } catch (error) {
        console.error('Error al verificar la autenticación', error);
        this.resetAuthState();
        return false;
      }
    },

    async login(credentials: { email: string; password: string }) {
      try {
        await api.post('/api/login', credentials, { withCredentials: true });
        await this.verifyAuth(); // Verifica la autenticación después de iniciar sesión
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      try {
        await api.post('/api/logout', {}, { withCredentials: true });
        this.resetAuthState();
      } catch (error) {
        console.error('Error al cerrar sesión', error);
      }
    },

    resetAuthState() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
