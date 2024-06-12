<template>
  <div class="chat-container">
    <div class="chat-wrapper">
      <Sidebar class="sidebar" @updateSideTabContent="handleSidebarItemSelected" />
      <SideTab class="side-tab" ref="sideTab" @selectUser="handleItemSelected" />
      <div class="chat-content">
<!--   设置聊天标题     -->
        <ChatHeader :username="currentChatName" class="chat-header" />
<!--   获取聊天内容     -->
        <ChatWindow :messages="messages" class="chat-window" />
<!--   消息框发送信息的逻辑     -->
        <ChatInput class="chat-input" @sendMessage="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from 'axios';
import Sidebar from '../components/Chat/Sidebar.vue';
import ChatHeader from '../components/Chat/ChatHeader.vue';
import ChatWindow from '../components/Chat/ChatWindow.vue';
import ChatInput from '../components/Chat/ChatInput.vue';
import SideTab from '../components/Chat/SideTab.vue';

export default {
  name: 'ChatView',

  // 视图 View 下注册的组件
  components: {
    Sidebar,
    ChatHeader,
    ChatWindow,
    ChatInput,
    SideTab
  },
  props: ['userId', 'groupId'],

  data() {
    return {
      ws: null,
      messages: [],
      currentChatName: '',
      currentGroupId: this.groupId,
    };
  },

  // 登录时建立WebSocket连接
  mounted() {
    if (this.currentGroupId) {
      this.initWebSocket(this.currentGroupId);
    }
  },

  // 离开时销毁WebSocket连接
  unmounted() {
    if (this.ws) {
      this.ws.onclose(undefined);
    }
  },

  // 将 Vuex 中的 `user`、`message` 状态映射到当前组件的计算属性中。
  // 可以在当前组件通过 `this.user`和`this.message` 来访问该状态。
  computed: {
    ...mapState(['user', 'groupIdMap'])
  },

  //
  watch: {
    groupId: {
      handler: 'fetchMessages',
      immediate: true
    }
  },

  methods: {
    // 从后端拉取历史记录
    async fetchMessages() {
      if (this.groupId) {
        try {
          const response = await axios.get(`/chat/${this.userId}/${this.groupId}/message`);
          console.log('Fetched messages:', response.data);
          this.messages = response.data.map(msg => ({
            ...msg,
            content: msg.messageContent,
            sender: msg.userId === this.user.userId ? 'me' : 'other'
          }));
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      }
    },

    // 发送消息
    async sendMessage(messageContent) {
      const messageDTO = {
        groupId: this.currentGroupId.toString(),
        content: messageContent,
        userId: this.user.userId,
        sender: 'me'
      };

      // 使用 WebSocket 发送消息
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(messageDTO));
      } else {
        console.error('WebSocket is not open.');
      }

      // 将消息存储在本地的message[]中
      this.addMessage({
        content: messageContent,
        sender: 'me',
        userId: this.user.userId,
        groupId: this.currentGroupId
      });
    },

    // 本地添加消息、实时更新在网页
    addMessage(message) {
      this.messages.push(message);
      this.$store.dispatch('addMessage', { message, groupId: this.currentGroupId });
    },


    // 处理Sidebar的选择
    handleSidebarItemSelected(sideTabContent) {
      this.$refs.sideTab.updateSideTabContent(sideTabContent);
    },

    // 处理SideTab的选择
    handleItemSelected(itemName) {
      // 仅处理 SideTab 的私人聊天和群组聊天名称
      this.updateCurrentChatName(itemName);
      // 这里定义 userId 需要使用语法 this.user?.userId
      const userId = this.user?.userId;

      if (!userId) {
        console.error('userId is undefined');
        return;
      }

      const selectedItem = this.$refs.sideTab.listItems.find(item => item === itemName);
      if (selectedItem) {
        const groupId = selectedItem.groupId;
        this.$router.push(`/chat/${userId}/${groupId}`).catch(() => {});
        this.initWebSocket(groupId);
      }
    },

    // 更新当前聊天ChatWindow的视图
    updateCurrentChatName(chatName) {
      this.currentChatName = chatName;

      // 用户名唯一且作为唯一标识符
      const otherUserId = chatName;

      // 检查是否已有groupId存在，否则创建一个新的整数groupId
      if (this.groupIdMap[otherUserId]) {
        this.currentGroupId = this.groupIdMap[otherUserId];
      } else {
        this.currentGroupId = Math.floor(Math.random() * 10000);
        this.$store.dispatch('setGroupId', { otherUserId, groupId: this.currentGroupId });
      }

      // 更新路由
      const userId = this.user?.userId;
      if (userId) {
        this.$router.push(`/chat/${userId}/${this.currentGroupId}`).catch(() => {});
      } else {
        console.error('userId is undefined');
      }

      this.initWebSocket(this.currentGroupId);
    },

    initWebSocket(groupId) {
      if (!groupId) {
        console.error('groupId is undefined');
        return;
      }

      if (this.ws) {
        this.ws.close();
      }

      let serverHost = window.location.hostname;
      let url = `ws://${serverHost}:8088/api/chat/${this.user?.userId}/${groupId}`;
      this.ws = new WebSocket(url);

      this.ws.onopen = () => { console.log(`连接成功：${url}`); };
      this.ws.onclose = () => { console.log(`连接关闭：${url}`); };
      this.ws.onerror = () => { console.log(`连接错误：${url}`); };
      this.ws.onmessage = (e) => {

        // 解析传输回来的Json字符串数据
        let resData = JSON.parse(e.data);

        console.log("e:", e);

        // 区分上下线和消息
        if (resData.type === "status") {
          // 打印消息
          console.log("Get a state message");
        } else {
          // 打印消息
          console.log("Get a user message")
          if (resData.userId !== this.user?.userId){
            // 在本地屏幕上输出其它用户传输的消息
            this.addMessage({
              content: resData.content,
              sender: 'other',
              userId: resData.userId,
              groupId: this.currentGroupId
            });
          }
        }
      };
    }
  },

  created() {
    this.fetchMessages();
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e0f7fa;
}

.chat-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.sidebar {
  flex: 0 0 60px;
}

.side-tab {
  flex: 0 0 250px;
}

.chat-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f8ff;
}

.chat-header,
.chat-window,
.chat-input {
  margin: 10px;
}

.chat-header {
  background-color: #1e90ff;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.chat-window {
  flex-grow: 1;
  background-color: #f0f8ff;
  border-radius: 5px;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 70px;
}

.chat-input {
  background-color: #f0f8ff;
  border-radius: 5px;
  padding: 10px;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 10px;
  left: 310px;
  width: calc(100% - 360px);
}
</style>
