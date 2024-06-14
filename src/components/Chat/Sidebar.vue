<template>
<!--  在这里修改侧边导航栏的水平 width -->
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-white text-white" style="width: 60px;">
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item" v-for="icon in icons" :key="icon.name">
        <a href="#"
           class="nav-link"
           :class="{ active: selectedItem === icon.name }"
           @click.prevent="handleSidebarItemSelected(icon.name)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path :d="icon.iconPath" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </li>
    </ul>
    <hr>
<!--    下拉菜单    -->
    <div class="dropup">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="true">
        <img src="../../assets/avatar/avatar.jpg" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>xuepeek Yang</strong>
        <ul class="dropdown-menu custom-dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
          <li><a class="dropdown-item" href="#">ResetPassword</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </a>
    </div>
  </div>
</template>

<script>
import { Dropdown } from 'bootstrap';
import { icons } from "@/assets/icon.js";

export default {
  name: 'Sidebar',
  data() {
    return {
      selectedItem: '',
      icons,
      sideTabContent: [
        {title: '', contentType: 'list', listItems: [ ]}
      ]
    }
  },
  mounted() {
    // 初始化下拉菜单
    const dropdownToggle = document.querySelector('#dropdownUser1');
    new Dropdown(dropdownToggle);

    this.handleSidebarItemSelected('PersonChat');
  },

  methods: {

    // 处理侧边栏选择逻辑
    handleSidebarItemSelected(itemName) {
      this.selectedItem = itemName;
      switch (itemName) {
        case 'PersonChat':
          this.sideTabContent = {
            title: '私人聊天',
            contentType: 'list',
            listItems: [
              { label: '宋唯嘉', groupId: '91001'},
              { label: '杨雪峰', groupId: '91002'},
              { label: '秦济深', groupId: '91003'},
              { label: '唐棣彬', groupId: '91004'},
              { label: '文件管理助手', groupId: 0}
            ]
          };
          break;
        case 'GroupChat':
          this.sideTabContent = {
            title: '群组聊天',
            contentType: 'list',
            listItems: [
              { label: '应用软件架构课程设计群', groupId: 1},
              { label: '2024汇编语言', groupId: 2 },
              { label: '2024软工实习', groupId: 3 }
            ]
          };
          break;
        case 'File':
          this.sideTabContent = {
            title: '文件管理',
            contentType: 'text',
            textContent: '这里显示的是文件相关内容。'
          };
          break;
        case 'Setting':
          this.sideTabContent = {
            title: '设置',
            contentType: 'list',
            listItems: []
          };
          break;
        default:
          this.sideTabContent = {
            title: '私人聊天',
            contentType: 'list',
            listItems: [
              { label: '宋唯嘉', groupId: '91001'},
              { label: '杨雪峰', groupId: '91002'},
              { label: '秦济深', groupId: '91003'},
              { label: '唐棣彬', groupId: '91004'},
              { label: '文件管理助手', groupId: 0}
            ]
          };
      }
      this.$emit('updateSideTabContent', this.sideTabContent);
    }
  }
}
</script>

<style scoped>
.nav-item {
  margin: 20px 0; /* 调整 margin 以适应窄侧边栏 */
}

.nav-item .nav-link {
  display: flex;
  justify-content: center; /* 居中图标 */
  padding: 5px;
  text-decoration: none;
}

.nav-item .nav-link svg {
  margin: 0;
}

.dropup .dropdown-toggle strong {
  display: none; /* 隐藏用户名 */
}

</style>
