<template>
  <div class="chat-window" ref="chatWindow">
    <div v-for="(msg, index) in messages" :key="index" class="message-container">
      <div class="message">
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatWindow',
  props: ['messages'],
  watch: {
    messages() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    }
  },
  methods: {
    scrollToBottom() {
      const chatWindow = this.$refs.chatWindow;
      if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  }
}
</script>

<style scoped>
.chat-window {
  background-color: #f0f8ff; /* 淡蓝色背景 */
  border-radius: 5px;
  overflow-y: auto;
  height: 100%; /* 适应父容器高度 */
  display: flex;
  flex-direction: column; /* 从上到下排列 */
  padding: 10px;
  margin-bottom: 70px; /* 留出输入框的位置 */
}

.message-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.message {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  text-align: right;
  margin-bottom: 10px;
  max-width: 80%;
}
</style>
