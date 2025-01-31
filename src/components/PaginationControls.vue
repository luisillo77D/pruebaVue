<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();
</script>

<template>
  <div class="pagination-controls">
    <button :disabled="taskStore.currentPage === 1" @click="taskStore.currentPage--" class="pagination-button">Anterior</button>
    <span class="pagination-info">Página {{ taskStore.currentPage }} de {{ Math.ceil(taskStore.tasks.length / 6) }}</span>
    <button :disabled="taskStore.currentPage >= Math.ceil(taskStore.tasks.length / 6)" @click="taskStore.currentPage++" class="pagination-button">Siguiente</button>
  </div>
</template>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination-button {
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-button:not(:disabled):hover {
  background-color: #0056b3;
}

.pagination-info {
  font-size: 1em;
}
</style>
