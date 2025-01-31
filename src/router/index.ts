import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';

const routes = [
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/',
    component: DashboardView,
    meta: { requiresAuth: true }, //Esta ruta requiere autenticación
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//Protección de rutas con espera de verificación de sesión
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    //Esperamos la verificación del backend
    const isAuthenticated = await authStore.verifyAuth();
    
    if (!isAuthenticated) {
      return next('/login'); // Si no está autenticado, lo manda al login
    }
  }
  
  next();
});

export default router;
