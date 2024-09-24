<template>
  <nav class="navbar">
    <ul class="menu">
      <li class="menu-item">
        <router-link to="/device-list">设备配置管理</router-link>
        <!-- 子菜单 -->
        <ul class="submenu">
          <li><router-link to="/device-config">设备配置添加</router-link></li>
        </ul>
      </li>
    </ul>
    <button class="logout-btn" @click="logout">Logout</button>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* 顶部导航栏样式 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333; /* 工业风深色背景 */
  padding: 15px 30px;
  color: white;
}

.menu {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.menu-item {
  position: relative; /* 为了显示子菜单 */
}

.menu-item a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s ease;
}

.menu-item a:hover {
  color: #ffae42; /* 悬停时的高亮颜色 */
}

/* 子菜单样式 */
.submenu {
  display: none; /* 默认隐藏子菜单 */
  position: absolute;
  top: 100%; /* 子菜单放在主菜单下方 */
  left: 0;
  background-color: #444;
  padding: 10px 0;
  min-width: 160px;
  list-style: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.submenu li {
  padding: 10px 20px;
}

.submenu li a {
  color: white;
  text-decoration: none;
  display: block;
  white-space: nowrap;
}

.submenu li a:hover {
  background-color: #555;
}

/* 当鼠标悬停在主菜单项时，显示子菜单 */
.menu-item:hover .submenu {
  display: block;
}

/* 退出按钮样式 */
.logout-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #d43f3f;
}
</style>
