<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();
</script>

<template>
  <div class="task-filters">
    <input v-model="taskStore.searchQuery" placeholder="Buscar por título" class="search-input" />
    <select v-model="taskStore.filterStatus" class="status-select">
      <option value="all">Todos</option>
      <option value="completed">Completados</option>
      <option value="pending">Pendientes</option>
    </select>
  </div>
</template>

<style scoped>
.task-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input,
.status-select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.search-input {
  flex: 1;
}

.status-select {
  width: 200px;
}

.search-input:focus,
.status-select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
