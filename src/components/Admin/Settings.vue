<template>
  <div class="settings-panel">
    <h2 class="title">系统设置</h2>
    <div class="form-group">
      <label for="siteName">站点名称:</label>
      <input type="text" v-model="settings.siteName" id="siteName">
    </div>
    <div class="form-group">
      <label for="adminEmail">管理员邮箱:</label>
      <input type="email" v-model="settings.adminEmail" id="adminEmail">
    </div>
    <div class="form-group">
      <label for="themeColor">主题颜色:</label>
      <input type="color" v-model="settings.themeColor" id="themeColor">
    </div>
    <button @click="saveSettings" class="save-button">保存设置</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Settings',
  data() {
    return {
      settings: {
        siteName: '',
        adminEmail: '',
        themeColor: '#ffffff'
      }
    };
  },
  methods: {
    async fetchSettings() {
      try {
        const response = await axios.get('/settings');
        this.settings = response.data;
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    },
    async saveSettings() {
      try {
        await axios.put('/settings', this.settings);
        alert('设置已保存');
      } catch (error) {
        console.error('Error saving settings:', error);
      }
    }
  },
  mounted() {
    this.fetchSettings();
  }
};
</script>

<style scoped>
.settings-panel {
  flex-grow: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #007bff;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="color"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.save-button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #218838;
}
</style>
