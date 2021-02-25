import { createApp } from 'vue'
import App from './App.vue'
import 'reflect-metadata'
import router from './router'

import 'noty/lib/noty.css'

createApp(App)
    .use(router)
    .mount('#app')
