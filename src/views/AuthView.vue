<template>
  <div class="auth-container">
    <div class="form-wrapper">
      <LoginForm v-if="currentForm === 'login'" @switch-form="switchForm" />
      <RegisterForm v-if="currentForm === 'register'" @switch-form="switchForm" />
      <ForgotPasswordForm v-if="currentForm === 'forgot'" @switch-form="switchForm" />
      <ResetPasswordForm v-if="currentForm === 'reset'" @switch-form="switchForm" />
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import ForgotPasswordForm from '../components/ForgotPasswordForm.vue';
import ResetPasswordForm from '../components/ResetPasswordForm.vue';

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
    switchForm(form) {
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
