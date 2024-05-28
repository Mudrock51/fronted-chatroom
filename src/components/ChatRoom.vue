<template>
  <div id="chat-app-container">
    <div id="chat-groups">
      <div v-for="group in chatGroups" :key="group.id" @click="selectGroup(group.id)" :class="{ active: group.id === activeGroupId }">
        {{ group.name }}
      </div>
    </div>
    <div id="chat-main">
      <div id="chat-header">
        <h2>{{ activeGroupName }}</h2>
        <span>Online: {{ onlineUsers }}</span>
      </div>
      <div id="message-container">
        <div v-for="message in activeMessages" :key="message.id" class="message">
          <div class="message-info">
            <span class="message-user">{{ message.user }}</span>
            <span class="message-time">{{ message.time }}</span>
          </div>
          <div class="message-text">{{ message.text }}</div>
        </div>
      </div>
      <form @submit.prevent="sendMessage" id="send-container">
        <input v-model="newMessage" type="text" id="message-input" placeholder="Type your message here...">
        <button type="submit" id="send-button">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMessage: '',
      onlineUsers: 5, // 这个值应该从服务器获取
      chatGroups: [
        { id: 1, name: 'Game Zone' },
        { id: 2, name: 'Study Zone' }
      ],
      messages: {
        1: [
          { id: 1, user: 'Alice', time: '10:00 AM', text: 'Hello everyone!' },
          { id: 2, user: 'Bob', time: '10:05 AM', text: 'Hi Alice!' }
        ],
        2: [
          { id: 3, user: 'Charlie', time: '10:10 AM', text: 'Anyone here for study?' }
        ]
      },
      activeGroupId: 1
    };
  },
  computed: {
    activeGroupName() {
      const group = this.chatGroups.find(group => group.id === this.activeGroupId);
      return group ? group.name : '';
    },
    activeMessages() {
      return this.messages[this.activeGroupId] || [];
    }
  },
  methods: {
    selectGroup(groupId) {
      this.activeGroupId = groupId;
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        const newMessage = {
          id: Date.now(),
          user: 'You',
          time: new Date().toLocaleTimeString(),
          text: this.newMessage
        };
        if (!this.messages[this.activeGroupId]) {
          this.messages[this.activeGroupId] = [];
        }
        this.messages[this.activeGroupId].push(newMessage);
        this.newMessage = '';
      }
    }
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

#chat-app-container {
  display: flex;
  height: 100vh;
}

#chat-groups {
  width: 200px;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
}

#chat-groups div {
  padding: 20px;
  cursor: pointer;
}

#chat-groups .active {
  background-color: #1abc9c;
}

#chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
}

#chat-header {
  padding: 10px;
  background-color: #ecf0f1;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#message-container {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
}

.message-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  color: #777;
}

.message-text {
  padding: 5px;
  background-color: #ecf0f1;
  border-radius: 5px;
}

#send-container {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}

#message-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

#send-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

#send-button:hover {
  background-color: #0056b3;
}
</style>
