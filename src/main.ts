import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia()); // Usa Pinia para manejar el estado global
app.use(router); // Usa Vue Router para la navegación

app.mount('#app'); // Monta la app en el div con id "app"
