<template>
    <div class="modal-overlay">
      <div class="modal">
        <h2>{{ taskData._id ? 'Editar Tarea' : 'Nueva Tarea' }}</h2>
        <div class="form">
            <input v-model="taskData.title" placeholder="Título" />
            <textarea v-model="taskData.description" placeholder="Descripción"></textarea>
        </div>
        <div class="actions">
            <button @click="saveTask">{{ taskData._id ? 'Guardar Cambios' : 'Crear Tarea' }}</button>
            <button @click="$emit('close')">Cancelar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, ref, watch } from 'vue';
  import { useTaskStore } from '@/stores/taskStore';
  
  const props = defineProps<{ task?: any }>();
  const emit = defineEmits(['close']);
  const taskStore = useTaskStore();
  
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
        taskData.value = { _id: '', title: '', description: '' };
      }
    },
    { immediate: true }
  );
  
  const saveTask = async () => {
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
    display: flex;
    width: 30%;
    flex-direction: column;
    background: white;
    padding: 20px;
    border-radius: 8px;
  }
  .form {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form input, .form textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

    .actions button {
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        padding: 10px 20px;
        transition: background-color 0.3s ease;
    }

    textarea{
        resize: none;
    }
  </style>
  