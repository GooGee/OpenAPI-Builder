import 'notyf/notyf.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import './asset/style.css'
import emitter from './emitter'
import router from './router'

createApp(App).provide('emitter', emitter).use(router).mount('#app')
