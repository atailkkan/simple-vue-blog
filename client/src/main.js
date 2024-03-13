import './assets/global.css'
import 'remixicon/fonts/remixicon.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'

const app = createApp(App)

app.use(router)

app.mount('#app')
