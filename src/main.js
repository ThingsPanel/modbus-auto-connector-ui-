import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // 引入路由配置
import ElementPlus from 'element-plus'; // 引入 ElementPlus
import 'element-plus/dist/index.css';  // 引入 ElementPlus 样式
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
    console.error('Global error handler:', err, info);
    // 你可以在这里添加错误提示，避免控制台抛出未处理的错误
};

app.mount('#app')
