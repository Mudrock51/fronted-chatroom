<template>
  <div class="form-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <input type="text" v-model="username" placeholder="Username" required>
      </div>
      <div class="form-group">
        <input type="password" v-model="password" placeholder="Password" required>
      </div>
      <button type="submit" class="btn">Login</button>
      <p class="switch-form">
        Don't have an account? <a @click="switchForm('register')">Register</a>
      </p>
      <p class="switch-form">
        Forgot your password? <a @click="switchForm('forgot')">Reset</a>
      </p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        // 使用axios发送POST请求到后端的/user/login 接口
        const response = await axios.post('/user/login', {
          username: this.username,
          password: this.password
        });
        console.log(response.data);
        // Handle successful login, redirect to chat room page
        const user = response.data;

        await this.$store.dispatch('setUser', user);

        if(user.username === 'admin'){
          await this.$router.push('/admin');
        }else{
          await this.$router.push(`/chat/${user.userId}`);
        }
      } catch (error) {
        console.error('登录失败', error);
        // Handle error, e.g., show error message
      }
    },

    switchForm(form) {
      this.$emit('switch-form', form);
    }
  }
};
</script>

<style scoped>
.form-container {
  background-color: #f8f0ff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

input[type="text"], input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  background-color: #7f00ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #5e00b3;
}

.switch-form {
  margin-top: 10px;
}
.switch-form a {
  color: #7f00ff;
  cursor: pointer;
  text-decoration: none;
}
</style>
