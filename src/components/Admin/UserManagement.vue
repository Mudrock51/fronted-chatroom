<template>
  <div class="admin-panel">
    <h2 class="title">用户信息管理平台</h2>
    <div class="filter-container">
      <input v-model="searchTerm" class="filter-input" placeholder="按姓名查询">
      <button @click="filterUsers" class="filter-button">查询</button>
    </div>
    <table class="users-table">
      <thead>
      <tr>
        <th>用户ID</th>
        <th>姓名</th>
        <th>邮箱</th>
        <th>在线状态</th>
        <th>详细信息</th>
        <th>修改</th>
        <th>删除</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in filteredUsers" :key="user.userId">
        <td>{{ user.userId }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.status }}</td>
        <td><button @click="viewDetails(user)" class="action-button">详细信息</button></td>
        <td><button @click="editUser(user)" class="action-button">修改</button></td>
        <td><button @click="deleteUser(user.userId, index)" class="action-button">删除</button></td>
      </tr>
      </tbody>
    </table>
    <button @click="addUser" class="add-button">录入用户信息</button>

    <!-- 模态框 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ isEditMode ? '修改用户信息' : '录入用户信息' }}</h2>
        <div class="form-group">
          <label for="username">姓名:</label>
          <input type="text" v-model="currentUser.username" id="username">
        </div>
        <div class="form-group">
          <label for="email">邮箱:</label>
          <input type="text" v-model="currentUser.email" id="email">
        </div>
        <div class="form-group">
          <label for="password">密码:</label>
          <input type="password" v-model="currentUser.password" id="password">
        </div>
        <div class="form-group">
          <label for="avatarUrl">头像URL:</label>
          <input type="text" v-model="currentUser.avatarUrl" id="avatarUrl">
        </div>
        <div class="form-group">
          <label for="status">在线状态:</label>
          <select v-model="currentUser.status" id="status">
            <option value="online">online</option>
            <option value="offline">offline</option>
          </select>
        </div>
        <button @click="saveUser" class="save-button">{{ isEditMode ? '保存' : '添加' }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminPanel',
  data() {
    return {
      searchTerm: '',
      users: [],
      filteredUsers: [],
      showModal: false,
      isEditMode: false,
      currentUser: {
        userId: null,
        username: '',
        email: '',
        password: '',
        avatarUrl: '',
        status: 'offline'
      }
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/user/all');
        this.users = response.data;
        this.filteredUsers = this.users;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    filterUsers() {
      if (this.searchTerm) {
        this.filteredUsers = this.users.filter(user => user.username.includes(this.searchTerm));
      } else {
        this.filteredUsers = this.users;
      }
    },
    viewDetails(user) {
      alert(`详细信息：\n用户ID: ${user.userId}\n姓名: ${user.username}\n邮箱: ${user.email}\n在线状态: ${user.status}`);
    },
    editUser(user) {
      this.currentUser = { ...user };
      this.isEditMode = true;
      this.showModal = true;
    },
    deleteUser(userId, index) {
      if (confirm('确定要删除这条信息吗？')) {
        axios.delete(`/user/${userId}`).then(() => {
          this.filteredUsers.splice(index, 1);
        }).catch(error => {
          console.error('Error deleting user:', error);
        });
      }
    },
    addUser() {
      this.currentUser = {
        userId: null,
        username: '',
        email: '',
        password: '',
        avatarUrl: '',
        status: 'offline'
      };
      this.isEditMode = false;
      this.showModal = true;
    },
    async saveUser() {
      if (this.isEditMode) {
        try {
          await axios.put(`/user/${this.currentUser.userId}`, this.currentUser);
          this.fetchUsers();
          this.closeModal();
        } catch (error) {
          console.error('Error updating user:', error);
        }
      } else {
        try {
          await axios.post('/user', this.currentUser);
          this.fetchUsers();
          this.closeModal();
        } catch (error) {
          console.error('Error adding user:', error);
        }
      }
    },
    closeModal() {
      this.showModal = false;
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.admin-panel {
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

.filter-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-input {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.filter-button {
  padding: 5px 20px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-button:hover {
  background-color: #0056b3;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.users-table th, .users-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.users-table th {
  background-color: #f7f7f7;
}

.action-button {
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #218838;
}

.add-button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #17a2b8;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #138496;
}

/* 模态框样式 */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.close {
  float: right;
  font-size: 24px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
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
