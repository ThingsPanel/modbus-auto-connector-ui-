import axios from 'axios';
import { ElMessage } from 'element-plus';
// 创建 axios 实例
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL, // 后端 API 的基础 URL
    timeout: 5000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 从 localStorage 中获取 token
        const token = localStorage.getItem('token');

        // 如果 token 存在，添加到请求头中
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // 在发送请求之前可以进行一些额外处理
        return config;
    },
    (error) => {
        // 请求错误处理
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        const { data} = response
        return data
    },
    (error) => {
        if (error.response){
            const {message} = error.response.data;
            const status = error.response.status
            // 根据不同的状态码处理错误提示
            switch (status) {
                case 400:
                    ElMessage.error(message);  // 显示400错误
                    break;
                case 401:
                    ElMessage.error('未授权，请登录 (401)');  // 未授权错误
                    localStorage.removeItem('token');
                    //window.location.href = '/login';  // 重定向到登录页
                    this.$router.push("/")
                    break;
                case 403:
                    ElMessage.error('拒绝访问 (403)');  // 权限错误
                    break;
                case 404:
                    ElMessage.error('请求资源未找到 (404)');  // 资源未找到
                    break;
                case 500:
                    ElMessage.error('服务器内部错误 (500)');  // 服务器错误
                    break;
                default:
                    ElMessage.error(`请求失败，错误代码: ${status}`);  // 其他未知错误
            }
        } else if (error.request) {
            ElMessage.error('网络错误，请检查您的网络连接');  // 请求未得到响应
        } else {
            ElMessage.error(`请求出错: ${error.message}`);  // 其他错误
        }
        return Promise.reject(null);
    }
);

export default instance;
