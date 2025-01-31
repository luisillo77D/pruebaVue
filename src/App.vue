<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(async() => {
  await authStore.verifyAuth(); // Verifica la autenticación al cargar la app
});
</script>

<template>
  <div class="app">
    <router-view></router-view> <!-- Muestra la vista activa según la ruta -->
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
.app {
  height: 100vh;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
}
</style>