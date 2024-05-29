<template>
  <div class="chat-input p-3 bg-light">
    <div class="input-group">
      <input type="text" class="form-control" v-model="message" placeholder="Type your message...">
      <button class="btn btn-secondary" type="button" @click="toggleOptions">···</button>
      <button class="btn btn-success" type="button" @click="sendMessage">Send</button>
    </div>
    <div v-if="showOptions" class="options-menu p-2 bg-light border rounded">
      <button class="btn btn-outline-primary btn-sm" @click="attachFile">Attach File</button>
      <button class="btn btn-outline-primary btn-sm" @click="openCamera">Camera</button>
      <button class="btn btn-outline-primary btn-sm" @click="openGallery">Gallery</button>
      <button class="btn btn-outline-primary btn-sm" @click="sendAudio">Audio</button>
      <button class="btn btn-outline-primary btn-sm" @click="sendLocation">Location</button>
      <button class="btn btn-outline-primary btn-sm" @click="openContacts">Contacts</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatInput',
  data() {
    return {
      message: '',
      showOptions: false
    };
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== '') {
        this.$emit('sendMessage', this.message); // 发送消息
        this.message = '';
      }
    },
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    attachFile() {
      alert('Attach File clicked');
    },
    openCamera() {
      alert('Open Camera clicked');
    },
    openGallery() {
      alert('Open Gallery clicked');
    },
    sendAudio() {
      alert('Send Audio clicked');
    },
    sendLocation() {
      alert('Send Location clicked');
    },
    openContacts() {
      alert('Open Contacts clicked');
    }
  }
}
</script>

<style scoped>
.chat-input {
  background-color: #f0f8ff; /* 淡蓝色背景 */
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 10px;
  left: 310px; /* 确保不覆盖Sidebar */
  width: calc(100% - 320px); /* 确保不覆盖Sidebar */
}

.options-menu {
  position: absolute;
  bottom: 60px; /* 调整这个值以适应选项菜单的位置 */
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
