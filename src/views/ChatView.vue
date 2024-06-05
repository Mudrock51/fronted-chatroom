<template>
  <div class="chat-container">
    <div class="chat-wrapper">
      <Sidebar class="sidebar" @itemSelected="handleItemSelected" />
      <SideTab class="side-tab"
               :title="sideTabTitle"
               :contentType="sideTabContentType"
               :listItems="sideTabListItems"
               :textContent="sideTabTextContent"
               :buttonText="sideTabButtonText"
               @selectUser="updateCurrentChatName" />
      <div class="chat-content">
        <ChatHeader :username="currentChatName" class="chat-header" />
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
import SideTab from '../components/Chat/SideTab.vue'; // 引入 SideTab 组件

export default {
  name: 'ChatView',
  components: {
    Sidebar,
    ChatHeader,
    ChatWindow,
    ChatInput,
    SideTab // 注册 SideTab 组件
  },
  data() {
    return {
      messages: ["Hello", "How are you?", "This is a test message", 'Wish you can have a nice day!'], // 示例消息
      currentChatName: 'Kristen Taylor',
      sideTabTitle: '功能菜单',
      sideTabContentType: 'list',
      sideTabListItems: ['选项 1', '选项 2', '选项 3'],
      sideTabTextContent: '',
      sideTabButtonText: '操作按钮'
    };
  },
  methods: {
    addMessage(message) {
      this.messages.push(message); // 修改为添加到末尾
    },
    handleItemSelected(itemName) {
      switch (itemName) {
        case 'PersonChat':
          this.currentChatName = '私人聊天用户';
          this.sideTabTitle = '私人聊天';
          this.sideTabContentType = 'list';
          this.sideTabListItems = ['用户1', '用户2', '用户3'];
          this.sideTabButtonText = '开始私人聊天';
          break;
        case 'GroupChat':
          this.currentChatName = '群组聊天';
          this.sideTabTitle = '群组聊天';
          this.sideTabContentType = 'list';
          this.sideTabListItems = ['应用软件架构课程设计群', '2024汇编语言', '2024软工实习'];
          this.sideTabButtonText = '进入群组聊天';
          break;
        case 'File':
          this.currentChatName = '文件管理';
          this.sideTabTitle = '文件';
          this.sideTabContentType = 'text';
          this.sideTabTextContent = '这里显示的是文件相关内容。';
          this.sideTabButtonText = '管理文件';
          break;
        case 'Setting':
          this.currentChatName = '设置';
          this.sideTabTitle = '设置';
          this.sideTabContentType = 'list';
          this.sideTabListItems = ['设置 1', '设置 2', '设置 3'];
          this.sideTabButtonText = '保存设置';
          break;
        default:
          this.currentChatName = 'Kristen Taylor';
          this.sideTabTitle = '功能菜单';
          this.sideTabContentType = 'list';
          this.sideTabListItems = ['选项 1', '选项 2', '选项 3'];
          this.sideTabButtonText = '操作按钮';
      }
    },
    updateCurrentChatName(chatName) {
      this.currentChatName = chatName;
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
  flex: 0 0 20px
}

.side-tab {
  flex: 0 0 400px; /* 设置宽度为400px */
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
  left: 590px; /* 确保不覆盖 SideTab 和 Sidebar */
  width: calc(100% - 640px); /* 确保不覆盖 SideTab 和 Sidebar */
}
</style>

