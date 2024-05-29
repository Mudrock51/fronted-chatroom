<template>
  <div class="chat-container">
    <div class="chat-wrapper">
      <Sidebar class="sidebar" />
      <div class="chat-content">
        <ChatHeader class="chat-header" />
        <ChatWindow :messages="messages" class="chat-window" />
        <ChatInput class="chat-input" @sendMessage="addMessage" />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Chat/Sidebar.vue';
import ChatHeader from '../components/Chat/ChatHeader.vue';
import ChatWindow from '../components/Chat/ChatWindow.vue';
import ChatInput from '../components/Chat/ChatInput.vue';

export default {
  name: 'ChatView',
  components: {
    Sidebar,
    ChatHeader,
    ChatWindow,
    ChatInput
  },
  data() {
    return {
      messages: ["Hello", "How are you?", "This is a test message", 'Wish you can have a nice day!'] // 示例消息
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
.chat-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e0f7fa; /* 淡蓝色背景 */
}

.chat-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.sidebar {
  flex: 0 0 280px;
  background-color: #f0f8ff; /* 淡蓝色背景 */
}

.chat-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f8ff; /* 淡蓝色背景 */
}

.chat-header,
.chat-window,
.chat-input {
  margin: 10px;
}

.chat-header {
  background-color: #1e90ff; /* 深蓝色背景 */
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.chat-window {
  flex-grow: 1;
  background-color: #f0f8ff; /* 淡蓝色背景 */
  border-radius: 5px;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 70px; /* 留出输入框的位置 */
}

.chat-input {
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
