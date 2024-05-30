<template>
  <div class="auth-container">
    <div class="form-wrapper">
      <LoginForm v-if="currentForm === 'login'" @switch-form="handleSwitchForm" />
      <RegisterForm v-if="currentForm === 'register'" @switch-form="handleSwitchForm" />
      <ForgotPasswordForm v-if="currentForm === 'forgot'" @switch-form="handleSwitchForm" />
      <ResetPasswordForm v-if="currentForm === 'reset'" @switch-form="handleSwitchForm" />
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/Auth/LoginForm.vue';
import RegisterForm from '../components/Auth/RegisterForm.vue';
import ForgotPasswordForm from '../components/Auth/ForgotPasswordForm.vue';
import ResetPasswordForm from '../components/Auth/ResetPasswordForm.vue';

export default {
  name: 'AuthView',
  components: {
    LoginForm,
    RegisterForm,
    ForgotPasswordForm,
    ResetPasswordForm
  },
  data() {
    return {
      currentForm: 'login'
    };
  },
  methods: {
    handleSwitchForm(form) {
      this.currentForm = form;
    }
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e0f7fa;
}

.form-wrapper {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}
</style>
