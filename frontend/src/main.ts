import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './global.css'
import 'virtual:uno.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

import App from './App.vue'
import router from './router'

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: false, 
  mirror: true 
})

const vueApp = createApp(App)

vueApp.use(createPinia())
vueApp.use(router)

vueApp.mount('#app')
