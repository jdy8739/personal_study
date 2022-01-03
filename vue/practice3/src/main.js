import { createApp } from 'vue'
import App from './App.vue'
import store from './store.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router.js'
import axios from 'axios';
import mitt from 'mitt';
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.config.globalProperties.axios = axios;

app.use(router).use(store).mount('#app')
