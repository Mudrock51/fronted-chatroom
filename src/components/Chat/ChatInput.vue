<template>
  <div class="chat-input">
    <input type="text" v-model="message" @keyup.enter="sendMessage" placeholder="Type your message..." />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>

export default {
  name: 'ChatInput',
  props: ['ws'],
  data() {
    return {
      message: ''
    };
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== '') {
        this.$emit('sendMessage', this.message);
        this.message = '';
      }
    }
  }
}
</script>

<style scoped>
.chat-input {
  display: flex;
  background-color: #f0f8ff;
  border-top: 1px solid #ddd;
  padding: 10px;
}

input {
  flex-grow: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

button {
  margin-left: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #1e90ff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
