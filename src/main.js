import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useConnectionStore } from './stores/connection';


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia());
app.use(router)

const connectionStore = useConnectionStore();
connectionStore.bindEvents();

app.mount('#app')
