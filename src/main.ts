import { createApp } from 'vue'
import './asset/style.css'
import 'notyf/notyf.min.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
