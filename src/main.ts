import './assets/css/tailwind.css'
import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { vReveal } from './composables/vReveal'

const app = createApp(App)
app.directive('reveal', vReveal)
app.mount('#app')
