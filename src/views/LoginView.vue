<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();
const errorMessage = ref('');

const login = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push('/'); // Redirige al dashboard si el login es exitoso
  } catch (error) {
    errorMessage.value = 'Credenciales incorrectas';
    console.error(error);
  }
};
</script>

<template>
  <div class="container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Correo electrónico" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p>¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
  </div>
</template>

<style scoped>
.container { text-align: center; max-width: 400px; margin: auto; }
input { display: block; width: 100%; margin-bottom: 10px; padding: 8px; }
button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; cursor: pointer; }
.error { color: red; }
</style>
