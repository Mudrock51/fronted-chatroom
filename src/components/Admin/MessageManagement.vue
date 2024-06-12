<template>
  <div class="message-panel">
    <h2 class="title">聊天消息管理平台</h2>
    <div class="filter-container">
      <input v-model="searchTerm" class="filter-input" placeholder="按发送者姓名查询">
      <button @click="filterMessages" class="filter-button">查询</button>
    </div>
    <table class="messages-table">
      <thead>
      <tr>
        <th>消息ID</th>
        <th>群组ID</th>
        <th>发送者ID</th>
        <th>发送者姓名</th>
        <th>消息内容</th>
        <th>删除</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(message, index) in filteredMessages" :key="message.messageId">
        <td>{{ message.messageId }}</td>
        <td>{{ message.groupId }}</td>
        <td>{{ message.userId }}</td>
        <td>{{ getUserName(message.userId) }}</td>
        <td>{{ message.messageContent }}</td>
        <td><button @click="deleteMessage(message.messageId, index)" class="action-button">删除</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MessagePanel',
  data() {
    return {
      searchTerm: '',
      messages: [],
      users: [],
      filteredMessages: []
    };
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await axios.get('/chat/all');
        console.log('Messages:', response.data);  // 添加调试日志
        this.messages = response.data;
        this.filteredMessages = this.messages;
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get('/user/all');
        console.log('Users:', response.data);  // 添加调试日志
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    filterMessages() {
      if (this.searchTerm) {
        this.filteredMessages = this.messages.filter(message => {
          const user = this.users.find(user => user.userId === message.userId);
          return user && user.username.includes(this.searchTerm);
        });
      } else {
        this.filteredMessages = this.messages;
      }
    },
    getUserName(userId) {
      const user = this.users.find(user => user.userId === userId);
      return user ? user.username : '未知';
    },
    async deleteMessage(messageId, index) {
      if (confirm('确定要删除这条消息吗？')) {
        try {
          await axios.delete(`/chat/${messageId}`);
          this.filteredMessages.splice(index, 1);
        } catch (error) {
          console.error('Error deleting message:', error);
        }
      }
    }
  },
  async mounted() {
    await this.fetchUsers();
    await this.fetchMessages();
    console.log('Filtered Messages:', this.filteredMessages); // 调试日志
  }
};
</script>

<style scoped>
.message-panel {
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

.messages-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.messages-table th, .messages-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.messages-table th {
  background-color: #f7f7f7;
}

.action-button {
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #c82333;
}
</style>
