import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

app.use(createPinia()); // Usa Pinia para manejar el estado global
app.use(router); // Usa Vue Router para la navegación
app.use(Toast);
app.mount('#app'); 
