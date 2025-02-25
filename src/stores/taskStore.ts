import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/utils/api';
import type { Task } from '@/types/Task';
import { useToast } from 'vue-toastification';


export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>([]);
  const searchQuery = ref('');
  const filterStatus = ref<'all' | 'completed' | 'pending'>('all');
  const currentPage = ref(1);
  const tasksPerPage = 6;
  const toast = useToast();

  const fetchTasks = async () => {
    try {
      const { data } = await api.get<Task[]>('/api/tasks/');
      if(!data) return;
      tasks.value = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  };

  const createTask = async (newTask: Omit<Task, '_id' | 'createdAt' | 'status'>) => {
    try {
      const { data } = await api.post<Task>('/api/tasks/', newTask);
      tasks.value.unshift(data);
      console.log('Tarea creada:', data);
      toast.success('Tarea creada correctamente.');
    } catch (error) {
      console.error('Error al crear tarea:', error);
      toast.error('Hubo un problema al crear la tarea.');
    }
  };

  const updateTaskStatus = async (taskId: string, status: boolean) => {
    try {
      await api.put(`/api/tasks/status/${taskId}`, { status });
      const task = tasks.value.find(t => t._id === taskId);
      if (task) task.status = status;
      toast.success(`Tarea ${status ? 'completada' : 'pendiente'} correctamente.`);
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      toast.error('Hubo un problema al actualizar la tarea.');
    }
  };

  const updateTask = async (taskId: string, updatedTask: Omit<Task, '_id' | 'createdAt' | 'status'>) => {
    try {
      await api.put(`/api/tasks/${taskId}`, updatedTask);
      const task = tasks.value.find(t => t._id === taskId);
      if (task) {
        task.title = updatedTask.title;
        task.description = updatedTask.description;
      }
      toast.success('Tarea actualizada correctamente.');
    } catch (error) {
      toast.error('Hubo un problema al actualizar la tarea.');
      console.error('Error al actualizar tarea:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await api.delete(`/api/tasks/${taskId}`);
      tasks.value = tasks.value.filter(t => t._id !== taskId);
      toast.success('Tarea eliminada correctamente.');
    } catch (error) {
      toast.error('Hubo un problema al eliminar la tarea.');
      console.error('Error al eliminar tarea:', error);
    }
  };

  const filteredTasks = computed(() => {
    return tasks.value.filter(task => 
      (filterStatus.value === 'all' || (filterStatus.value === 'completed' ? task.status : !task.status)) &&
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  const paginatedTasks = computed(() => {
    const start = (currentPage.value - 1) * tasksPerPage;
    return filteredTasks.value.slice(start, start + tasksPerPage);
  });

  return {
    tasks,
    searchQuery,
    filterStatus,
    currentPage,
    fetchTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
    paginatedTasks,
    updateTask,
  };
});
