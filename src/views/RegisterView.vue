<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();

const register = async () => {
  try {
    await authStore.register({ username: username.value, email: email.value, password: password.value });
    router.push('/'); // Redirige al dashboard si el registro es exitoso
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
.container {
  text-align: center;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

input:focus {
  border-color: #28a745;
  outline: none;
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
}

button {
  width: 100%;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #218838;
}

.error {
  color: red;
  margin-top: 10px;
}

p {
  margin-top: 20px;
  color: #555;
}

a {
  color: #28a745;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
