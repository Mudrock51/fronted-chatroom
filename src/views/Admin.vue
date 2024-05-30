<template>
  <div class="admin-container">
    <div class="admin-wrapper">
      <Sidebar class="sidebar" />
      <div class="admin-content">
        <AdminHeader class="admin-header" />
        <AdminWindow :messages="messages" class="admin-window" />
        <AdminInput class="admin-input" @sendMessage="addMessage" />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Admin/AdminSidebar.vue';
import AdminHeader from '../components/Admin/AdminHeader.vue';
import AdminWindow from '../components/Admin/AdminWindow.vue';

export default {
  name: 'AdminView',
  components: {
    Sidebar,
    AdminHeader,
    AdminWindow
  },
  data() {
    return {

    };
  },
  methods: {
    addMessage(message) {
      this.messages.push(message); // 修改为添加到末尾
    }
  }
};
</script>

<style scoped>
.admin-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e0f7fa; /* 淡蓝色背景 */
}

.admin-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.sidebar {
  flex: 0 0 280px;
  background-color: #f0f8ff; /* 淡蓝色背景 */
}

.admin-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f8ff; /* 淡蓝色背景 */
}

.admin-header,
.admin-window,
.admin-input {
  margin: 10px;
}

.admin-header {
  background-color: #1e90ff; /* 深蓝色背景 */
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.admin-window {
  flex-grow: 1;
  background-color: #f0f8ff; /* 淡蓝色背景 */
  border-radius: 5px;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 70px; /* 留出输入框的位置 */
}

.admin-input {
  background-color: #f0f8ff; /* 淡蓝色背景 */
  border-radius: 5px;
  padding: 10px;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 10px;
  left: 310px; /* 确保不覆盖Sidebar */
  width: calc(100% - 320px); /* 确保不覆盖Sidebar */
}
</style>
