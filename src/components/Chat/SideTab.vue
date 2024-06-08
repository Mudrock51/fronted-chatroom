<template>
  <div class="side-tab d-flex flex-column flex-shrink-0 p-3 bg-white" style="width: 250px;">
    <h2 class="side-tab__title fs-4">{{ title }}</h2>
    <ul class="nav nav-pills flex-column mb-auto">
      <template v-if="contentType === 'list'">
        <li v-for="item in listItems" :key="item.name" class="nav-item">
          <a href="#" class="nav-link" @click.prevent="selectItem(item)">
            {{ item.label }}
          </a>
        </li>
      </template>
      <template v-else-if="contentType === 'text'">
        <li class="nav-item">
          <p class="side-tab__text">{{ textContent }}</p>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SideTab",
  props: ['userId'],
  data() {
    return {
      title: '功能菜单',
      contentType: 'list',
      listItems: [
        { name: 'user1', label: '用户1', groupId: 1 },
        { name: 'user2', label: '用户2', groupId: 2 },
        { name: 'user3', label: '用户3', groupId: 3 }
      ],
      textContent: ''
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    selectItem(item) {
      const userId = this.user?.userId;

      if (!userId) {
        console.error('userId is undefined');
        return;
      }

      const groupId = item.groupId;

      this.updateSideTab(item.label, 'list', this.listItems);
      this.$store.dispatch('setGroupId', { userId, groupId });
      this.$router.push(`/chat/${userId}/${groupId}`).catch(() => {});
      this.$emit('selectUser', item.label);
    },
    updateSideTab(title, contentType, listItems = [], textContent = '') {
      this.title = title;
      this.contentType = contentType;
      this.listItems = listItems;
      this.textContent = textContent;
    },
    updateSideTabContent({ title, contentType, listItems = [], textContent = '' }) {
      this.updateSideTab(title, contentType, listItems, textContent);
    }
  }
}
</script>

<style scoped>
.side-tab {
  background-color: #f0f8ff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.side-tab__title {
  margin-bottom: 20px;
  color: #333;
}

.nav-item {
  margin: 10px 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px;
  color: #000;
  text-decoration: none;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #e0f7fa;
}

.side-tab__text {
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
