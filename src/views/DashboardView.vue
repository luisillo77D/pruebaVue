<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import TaskList from '@/components/TaskList.vue';
import TaskFilters from '@/components/TaskFilters.vue';
import TaskModal from '@/components/TaskModal.vue';
import PaginationControls from '@/components/PaginationControls.vue';

const taskStore = useTaskStore();
const authStore = useAuthStore();
const router = useRouter();

const showModal = ref(false);
const selectedTask = ref<any>(null);

onMounted(() => {
  if (authStore.isAuthenticated) {
    taskStore.fetchTasks();
  }
});

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};

const openModal = (task = null) => {
  selectedTask.value = task;
  showModal.value = true;
};
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard - Tareas</h1>
    <div class="content">
      <div class="navbar">
        <h2>Bienvenido, {{ authStore.user?.username }}</h2>
        <button @click="logout" class="logout-button">Cerrar sesión</button>
      </div>

      <div class="actions">
        <TaskFilters />
        <button @click="openModal()" class="add-task-button">Agregar Tarea</button>
      </div>

      <TaskModal v-if="showModal" :task="selectedTask" @close="showModal = false" />
      <TaskList @edit-task="openModal" />
      <PaginationControls />
    </div>
  </div>
</template>


<style scoped>
.dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: center;
}

.auth-message {
  text-align: center;
  font-size: 1.2em;
  color: #ff0000;
}

.content {
  text-align: center;
}

h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.logout-button,
.add-task-button {
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  padding: 10px 20px;
  margin: 10px;
  transition: background-color 0.3s ease;
}

.logout-button:hover,
.add-task-button:hover {
  background-color: #0056b3;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}	

</style>