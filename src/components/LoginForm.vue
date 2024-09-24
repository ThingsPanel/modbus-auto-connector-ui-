<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="username" type="text" id="username" placeholder="Enter your username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" class="login-btn">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import {Login} from "@/api/api";

export default {
  data() {
    return {
      username: 'admin',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await Login({
          username: this.username,
          password: this.password
        })
        console.log(res)
        localStorage.setItem("token", res.data.token)
        this.$router.push({"name":"device-config-list"})
        // eslint-disable-next-line no-empty
      } catch (e) {

      }
    },
  },
};
</script>

<style scoped>
/* 背景设置 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  font-family: 'Arial', sans-serif;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
  animation: fadeIn 1s ease-in-out;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

/* 表单字段样式 */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #6e8efb;
  box-shadow: 0 0 8px rgba(110, 142, 251, 0.3);
}

/* 按钮样式 */
.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #6e8efb;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #5a79e0;
}

/* 错误信息样式 */
.error {
  color: red;
  margin-top: 15px;
  font-size: 14px;
}

/* 添加一些简单的淡入动画 */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
