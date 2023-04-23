import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';

import '@mdi/font/css/materialdesignicons.css';
import '@/assets/main.css';

createApp(App).use(createPinia()).mount('#app');
