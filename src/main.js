import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 引入mock数据
import './mock/mockServe'

// 引入全局样式
import './assets/css/reset.css'

// 引入nprogress样式
import 'nprogress/nprogress.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
