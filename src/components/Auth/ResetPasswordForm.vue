<template>
  <div class="form-container">
    <h2>Reset Password</h2>
    <form @submit.prevent="resetPassword">
      <div class="form-group">
        <input type="password" v-model="newPassword" placeholder="New Password" required>
      </div>
      <div class="form-group">
        <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required>
      </div>
      <button type="submit" class="btn">Reset Password</button>
      <p class="switch-form">
        Remembered your password? <a @click="switchForm('login')">Login</a>
      </p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: ''
    };
  },
  methods: {
    async resetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
      try {
        const response = await axios.post('/user/resetPassword', { newPassword: this.newPassword });
        console.log(response.data);
        this.$emit('switch-form', 'login');
      } catch (error) {
        console.error(error);
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

input[type="password"] {
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
