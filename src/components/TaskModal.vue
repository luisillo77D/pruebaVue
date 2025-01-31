<template>
    <div class="modal-overlay">
      <div class="modal">
        <h2>{{ taskData._id ? 'Editar Tarea' : 'Nueva Tarea' }}</h2>
        <input v-model="taskData.title" placeholder="Título" class="input" />
        <textarea v-model="taskData.description" placeholder="Descripción" class="textarea"></textarea>
        <div class="buttons">
          <button @click="confirmSave" class="button primary">{{ taskData._id ? 'Guardar Cambios' : 'Crear Tarea' }}</button>
          <button @click="$emit('close')" class="button secondary">Cancelar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, ref, watch } from 'vue';
  import { useTaskStore } from '@/stores/taskStore';
  import type { Task } from '@/types/task';
  
  const props = defineProps<{ task?: Task }>();
  const emit = defineEmits(['close']);
  const taskStore = useTaskStore();
  console.log(props.task);
  
  const taskData = ref({
    _id: '',
    title: '',
    description: '',
  });
  
  watch(
    () => props.task,
    (newTask) => {
      if (newTask) {
        taskData.value = { ...newTask };
      } else {
        taskData.value = { _id: '', title: '', description: '', };
      }
    },
    { immediate: true }
  );
  
  const confirmSave = async () => {
  const confirm = window.confirm('¿Estás seguro de que quieres guardar los cambios?');
  if (!confirm) return;

  if (taskData.value._id) {
    await taskStore.updateTask(taskData.value._id, {
      title: taskData.value.title,
      description: taskData.value.description,
    });
  } else {
    await taskStore.createTask({
      title: taskData.value.title,
      description: taskData.value.description,
    });
  }
  emit('close');
};
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 1.5em;
    text-align: center;
  }
  
  .input,
  .textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;
  }
  
  .input:focus,
  .textarea:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  
  .textarea {
    resize: vertical;
    height: 100px;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  
  .button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
  }
  
  .button.primary {
    background-color: #007bff;
    color: white;
  }
  
  .button.primary:hover {
    background-color: #0056b3;
  }
  
  .button.secondary {
    background-color: #6c757d;
    color: white;
  }
  
  .button.secondary:hover {
    background-color: #5a6268;
  }
  </style>