<template>
  <div class="form-container">
    <h2>Forgot Password</h2>
    <form @submit.prevent="sendResetEmail">
      <div class="form-group">
        <input type="email" v-model="email" placeholder="Email" required>
      </div>
      <button type="submit" class="btn">Send Reset Email</button>
      <div v-if="showVerification">
        <div class="form-group">
          <input type="text" v-model="verificationCode" placeholder="Verification Code" required>
        </div>
        <button type="button" class="btn" @click="verifyCode">Verify</button>
      </div>
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
      email: '',
      verificationCode: '',
      showVerification: false
    };
  },
  methods: {
    async sendResetEmail() {
      try {
        const response = await axios.post('/user/forgetPassword', {
          action: 'sendEmail',
          email: this.email
        });
        console.log(response.data);
        this.showVerification = true;
        await this.verifyCode();
      } catch (error) {
        console.error(error);
      }
    },
    async verifyCode() {
      try {
        const response = await axios.post('/user/forgetPassword', {
          action: 'verifyCode',
          email: this.email,
          code: this.verificationCode
        });
        console.log(response.data);
        this.$emit('switch-form', 'reset');
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

input[type="email"], input[type="text"] {
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
