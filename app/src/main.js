
import { createApp } from 'vue'
import './style.css'
import i18n from "./locales";
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
