<template>
<!--  在这里修改侧边导航栏的水平 width -->
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-white text-white" style="width: 60px;">
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item" v-for="item in menuItems" :key="item.name">
        <a href="#"
           class="nav-link"
           :class="{ active: selectedItem === item.name }"
           @click.prevent="selectItem(item.name)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path :d="item.iconPath" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
<!--          {{ item.label }}-->
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
export default {
  name: 'Sidebar',
  data() {
    return {
      selectedItem: 'ChatGroup',
      menuItems: [
        { name: 'PersonChat', label: 'PersonnelChat', iconPath: 'M6.67816 21.6L11.6869 16.5913H19.5999C20.7045 16.5913 21.5999 15.6959 21.5999 14.5913V4.40002C21.5999 3.29545 20.7045 2.40002 19.5999 2.40002H4.3999C3.29533 2.40002 2.3999 3.29545 2.3999 4.40002V14.5913C2.3999 15.6959 3.29533 16.5913 4.3999 16.5913H6.67816V21.6Z' },
        { name: 'GroupChat', label: 'GroupChat', iconPath: 'M19 10.5V6C19 4.89543 18.1046 4 17 4H5C3.89543 4 3 4.89543 3 6V13.8261C3 14.9307 3.89543 15.8261 5 15.8261H6.56522V20L10.7391 15.8261H11M16.163 18.3913L18.7717 21V18.3913H19C20.1046 18.3913 21 17.4959 21 16.3913V13C21 11.8954 20.1046 11 19 11H13C11.8954 11 11 11.8954 11 13V16.3913C11 17.4959 11.8954 18.3913 13 18.3913H16.163Z' },
        { name: 'File', label: 'File', iconPath: 'M15.0001 2.3999V5.9999C15.0001 6.66264 15.5373 7.1999 16.2001 7.1999H19.8001M8.40008 7.1999H10.8001M8.40008 10.7999H15.6001M8.40008 14.3999H15.6001M18.0001 4.1999C17.466 3.72204 16.9118 3.15528 16.5619 2.78718C16.3291 2.54224 16.0074 2.3999 15.6695 2.3999H6.5998C5.27432 2.3999 4.19981 3.47441 4.1998 4.79989L4.19971 19.1998C4.1997 20.5253 5.27421 21.5998 6.5997 21.5998L17.3997 21.5999C18.7252 21.5999 19.7997 20.5254 19.7998 19.2L19.8001 6.47773C19.8001 6.1709 19.683 5.87594 19.4701 5.65503C19.0763 5.24655 18.4187 4.57442 18.0001 4.1999Z' },
        { name: 'Setting', label: 'Setting', iconPath: 'M11.6763 2.31627C11.2488 0.561243 8.75121 0.561243 8.3237 2.31627C8.25987 2.57999 8.13468 2.82492 7.95831 3.03112C7.78194 3.23732 7.55938 3.39897 7.30874 3.50291C7.0581 3.60684 6.78646 3.65014 6.51592 3.62927C6.24538 3.60839 5.9836 3.52394 5.75187 3.38279C4.20832 2.44227 2.44201 4.20855 3.38254 5.75207C3.99006 6.74884 3.45117 8.04936 2.31713 8.32499C0.560955 8.75137 0.560955 11.25 2.31713 11.6753C2.58093 11.7392 2.8259 11.8645 3.03211 12.041C3.23831 12.2175 3.39991 12.4402 3.50375 12.691C3.6076 12.9418 3.65074 13.2135 3.62968 13.4841C3.60862 13.7547 3.52394 14.0165 3.38254 14.2482C2.44201 15.7917 4.20832 17.558 5.75187 16.6175C5.98356 16.4761 6.24536 16.3914 6.51597 16.3704C6.78658 16.3493 7.05834 16.3924 7.30912 16.4963C7.5599 16.6001 7.7826 16.7617 7.95911 16.9679C8.13561 17.1741 8.26091 17.4191 8.32482 17.6829C8.75121 19.439 11.2499 19.439 11.6752 17.6829C11.7393 17.4192 11.8647 17.1744 12.0413 16.9684C12.2178 16.7623 12.4405 16.6008 12.6912 16.497C12.9419 16.3932 13.2135 16.35 13.4841 16.3709C13.7546 16.3919 14.0164 16.4764 14.2481 16.6175C15.7917 17.558 17.558 15.7917 16.6175 14.2482C16.4763 14.0165 16.3918 13.7547 16.3709 13.4842C16.35 13.2136 16.3932 12.942 16.497 12.6913C16.6008 12.4406 16.7623 12.2179 16.9683 12.0414C17.1744 11.8648 17.4192 11.7394 17.6829 11.6753C19.439 11.2489 19.439 8.75025 17.6829 8.32499C17.4191 8.26108 17.1741 8.13578 16.9679 7.95928C16.7617 7.78278 16.6001 7.56007 16.4962 7.3093C16.3924 7.05853 16.3493 6.78677 16.3703 6.51617C16.3914 6.24556 16.4761 5.98376 16.6175 5.75207C17.558 4.20855 15.7917 2.44227 14.2481 3.38279C14.0164 3.52418 13.7546 3.60886 13.484 3.62992C13.2134 3.65098 12.9417 3.60784 12.6909 3.504C12.4401 3.40016 12.2174 3.23856 12.0409 3.03236C11.8644 2.82616 11.7391 2.58119 11.6752 2.3174L11.6763 2.31627Z' },
      ]
    }
  },
  mounted() {
    // 初始化下拉菜单
    const dropdownToggle = document.querySelector('#dropdownUser1');
    new Dropdown(dropdownToggle);
  },

  methods: {
    selectItem(ItemName) {
      this.selectedItem = ItemName;
      this.$emit('itemSelected', ItemName); // 发出 itemSelected 事件并传递选择的项目名称
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
