<template>
  <div id="app">
    <!-- 使用 v-if 显示导航栏，非登录页面时显示 -->
    <AppNavbar v-if="!isLoginPage" />

    <!-- 渲染页面内容 -->
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppNavbar from './components/AppNavbar.vue';

export default {
  name: 'App',
  components: {
    AppNavbar
  },
  setup() {
    const route = useRoute();
    const isLoginPage = ref(false);  // 定义一个 ref 来存储是否为登录页的状态

    // 当路由发生变化时，检查是否在登录页
    const checkLoginPage = () => {
      isLoginPage.value = route.name === 'login';
    };

    // 监听页面变化
    onMounted(() => {
      checkLoginPage();  // 初始化时检查
      watch(() => route.fullPath, checkLoginPage);  // 监听路由变化
    });

    return {
      isLoginPage
    };
  }
};
</script>

<style>
/* 全局样式 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
