<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();
const errorMessage = ref('');

const register = async () => {
  try {
    await authStore.register({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    router.push('/'); // Redirige al dashboard después del registro
  } catch (error) {
    errorMessage.value = 'Error en el registro';
    console.error(error);
  }
};
</script>

<template>
  <div class="container">
    <h2>Registro</h2>
    <form @submit.prevent="register">
      <input v-model="username" type="text" placeholder="Nombre de usuario" required />
      <input v-model="email" type="email" placeholder="Correo electrónico" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Registrarse</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p>¿Ya tienes cuenta? <router-link to="/login">Inicia sesión aquí</router-link></p>
  </div>
</template>

<style scoped>
.container { text-align: center; max-width: 400px; margin: auto; }
input { display: block; width: 100%; margin-bottom: 10px; padding: 8px; }
button { width: 100%; padding: 10px; background: #28a745; color: white; border: none; cursor: pointer; }
.error { color: red; }
</style>
