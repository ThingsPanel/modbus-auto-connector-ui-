import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import DeviceConfig from '../components/DeviceConfig.vue';
import DeviceList from '../components/DeviceList.vue';

const routes = [
    { path: '/', name:"login", component: LoginForm },
    { path: '/device-config/:id?', name:"device-config", component: DeviceConfig },
    { path: '/device-list', name:"device-config-list", component: DeviceList }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (!token && to.name !== 'login') {
        // 如果没有 token 并且不是去登录页，重定向到登录页
        next({ name: 'login' });
    } else {
        // 允许进入目标路由
        next();
    }
});

export default router;
