<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore';
import { defineEmits } from 'vue';
import type { Task } from '@/types/task';

const taskStore = useTaskStore();
const emit = defineEmits(['edit-task']);

function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

function editTask(task: Task) {
  emit('edit-task', task);
}
</script>

<template>
    <ul class="task-list">
      <li v-for="task in taskStore.paginatedTasks" :key="task._id" class="task-card">
        <div class="header">
          <h2>{{ task.title }}</h2>
          <div>
            <span>{{ task.status ? 'Completada' : 'Pendiente' }}</span>
          </div>
        </div>
        <div class="body">
          <p>{{ task.description }}</p>
          <p>{{ formatDate(task.createdAt) }}</p>
        </div>
        <div class="actions">
          <button @click="taskStore.updateTaskStatus(task._id, !task.status)">Cambiar estado</button>
          <button @click="taskStore.deleteTask(task._id)">Eliminar</button>
          <button @click="editTask(task)">Editar</button> <!-- Nuevo botón -->
        </div>
      </li>
    </ul>
  </template>

<style scoped>
.task-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
  gap: 16px; 
}

.task-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  padding: 16px;
  transition: box-shadow 0.3s ease;
}

.task-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.body {
  margin-bottom: 16px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

button {
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  padding: 8px 12px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
