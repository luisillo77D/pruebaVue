<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();
</script>

<template>
  <ul>
    <li v-for="task in taskStore.paginatedTasks" :key="task._id">
      <span>{{ task.title }} - {{ task.status ? 'Completada' : 'Pendiente' }}</span>
      <button @click="taskStore.updateTaskStatus(task._id, !task.status)">Cambiar estado</button>
      <button @click="taskStore.deleteTask(task._id)">Eliminar</button>
    </li>
  </ul>
</template>
