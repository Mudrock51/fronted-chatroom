<template>
  <div class="form-container">
    <h1>找回密码</h1>
    <form v-if="step === 1" @submit.prevent="handleEmailSubmit">
      <div class="form-group">
        <label for="email">输入您的邮箱</label>
        <input type="email" v-model="email" placeholder="输入邮箱" required class="form-control" />
      </div>
      <button type="submit" class="btn">下一步</button>
      <p class="switch-form">
        <a @click.prevent="switchToLogin">返回登录界面</a>
      </p>
    </form>

    <form v-if="step === 2" @submit.prevent="verifyCode">
      <div class="form-group">
        <label for="verificationCode">验证码</label>
        <input type="text" v-model="verificationCode" placeholder="输入验证码" required class="form-control" />
      </div>
      <button type="button" class="btn" @click="sendVerificationCode" :disabled="sendButtonDisabled">{{ sendButtonText }}</button>
      <button type="submit" class="btn">下一步</button>
    </form>

    <p class="hint" v-if="step === 2">为提高找回密码的成功率，建议在经常使用的设备上操作。</p>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      verificationCode: '',
      showVerification: false,
      sendButtonText: '获取验证码',
      sendButtonDisabled: false,
      countdown: 60,
      step: 1,
      intervalId: null,
    };
  },
  methods: {
    async handleEmailSubmit() {
      try {
        const response = await axios.post('/user/forgetPassword', {
          action: 'sendEmail',
          email: this.email
        });
        console.log(response.data);
        alert('验证码已发送，请检查您的邮箱。');
        this.step = 2;
      } catch (error) {
        console.error(error);
        alert('发送验证码失败，请重试。');
      }
    },
    async sendVerificationCode() {
      if (this.sendButtonDisabled) {
        return;
      }

      try {
        const response = await axios.post('/user/sendVerificationCode', {
          email: this.email
        });
        alert('验证码已发送，请检查您的邮箱。');
        this.sendButtonDisabled = true;
        this.startCountdown();
        console.log(response);
      } catch (error) {
        console.error(error);
        alert('发送验证码失败，请重试。');
      }
    },
    startCountdown() {
      this.sendButtonText = `${this.countdown}秒`;
      this.intervalId = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(this.intervalId);
          this.sendButtonText = '获取验证码';
          this.sendButtonDisabled = false;
          this.countdown = 60;
        } else {
          this.sendButtonText = `${this.countdown}秒`;
        }
      }, 1000);
    },
    async verifyCode() {
      try {
        const response = await axios.post('/user/forgetPassword', {
          action: 'verifyCode',
          email: this.email,
          code: this.verificationCode,
        });
        console.log(response.data);
        alert('验证码验证成功，可以重置密码。');
        this.$emit('switch-form', 'reset');
      } catch (error) {
        console.error(error);
        alert('验证码验证失败，请重试。');
      }
    },
    switchToLogin() {
      this.$emit('switch-form', 'login');
    }
  },
  beforeUnMount() {
    clearInterval(this.intervalId);
  }
};
</script>



<style scoped>
.form-container {
  background-color: #f8f0ff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.form-container h1 {
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.btn {
  background-color: #7f00ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
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


