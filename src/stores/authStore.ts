import { defineStore } from 'pinia';
import api from '@/utils/api';
import type { User } from '@/types/User';
import { useToast } from 'vue-toastification';

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
        this.toast.success('Sesión iniciada correctamente.');
      } catch (error) {
        this.toast.error('Error de autentificacion.');
        throw error;
      }
    },

    async register(user: Omit<User, '_id'>) {
      try {
        await api.post('/api/register', user, { withCredentials: true });
        await this.verifyAuth(); // Verifica la autenticación después de registrar
        this.toast.success('Usuario registrado correctamente.');
      } catch (error) {
        console.error('Error al registrar usuario', error);
        this.toast.error('Hubo un problema al registrar el usuario.');
        throw error;
      }
    } ,

    async logout() {
      try {
        await api.post('/api/logout', {}, { withCredentials: true });
        this.deleteCookie('token'); // Elimina la cookie del token
        this.resetAuthState();
        this.toast.success('Sesión cerrada correctamente.');
      } catch (error) {
        console.error('Error al cerrar sesión', error);
        this.toast.error('Hubo un problema al cerrar sesión.');
      }
    },

    resetAuthState() {
      this.user = null;
      this.isAuthenticated = false;
    },

    deleteCookie(name: string) {
      document.cookie = name + '=; Max-Age=0; path=/; domain=' + window.location.hostname;
    },
  },

  getters: {
    toast: () => useToast()
  }
});
