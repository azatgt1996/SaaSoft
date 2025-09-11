import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).use(ElementPlus).mount('#app')
