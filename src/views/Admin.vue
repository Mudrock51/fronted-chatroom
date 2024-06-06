<template>
  <div class="admin-container">
    <div class="admin-wrapper">
      <Sidebar class="sidebar" @select-item="handleSelectItem" />
      <div class="admin-content">
        <AdminHeader class="admin-header" />
        <AdminWindow :selectedItem="selectedItem" class="admin-window" />
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
      selectedItem: 'UserManagement'
    };
  },
  methods: {
    handleSelectItem(itemName) {
      this.selectedItem = itemName;
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
  background-color: #e0f7fa;
}

.admin-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.sidebar {
  flex: 0 0 280px;
  background-color: #f0f8ff;
}

.admin-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f8ff;
}

.admin-header,
.admin-window {
  margin: 10px;
}

.admin-header {
  background-color: #1e90ff;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.admin-window {
  flex-grow: 1;
  background-color: #f0f8ff;
  border-radius: 5px;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
</style>
