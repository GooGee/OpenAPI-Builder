import mitt from 'mitt'
import 'notyf/notyf.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import './asset/style.css'
import router from './router'

createApp(App).provide('emitter', mitt()).use(router).mount('#app')
