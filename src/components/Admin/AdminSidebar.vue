<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-black bg-white" style="width: 280px;">
    <a href="/public" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <span class="fs-4 text-black">管理功能</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
          <i class="bi bi-house-door"></i>
          Home
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-black">
          <i class="bi bi-speedometer2"></i>
          Dashboard
        </a>
      </li>
      <!-- Add more items as needed -->
    </ul>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-black text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="../../assets/avatar/avatar.jpg" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong class="username">xuepeek Yang</strong>
      </a>
      <ul class="dropdown-menu custom-dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
        <li><a class="dropdown-item" href="#">ResetPassword</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Dropdown } from 'bootstrap'; // 确保导入 bootstrap

export default {
  name: 'AdminSidebar',
  mounted() {
    // 初始化下拉菜单
    const dropdownToggle = document.querySelector('#dropdownUser1');
    new Dropdown(dropdownToggle);
  }
}
</script>

<style scoped>
.username {
  color: #000000; /* 设置文字颜色为番茄红 */
}

.custom-dropdown-menu {
  background-color: white !important; /* 设置下拉菜单背景颜色为白色 */
  color: black !important; /* 设置下拉菜单文本颜色为黑色 */
}

.custom-dropdown-menu .dropdown-item {
  color: black !important; /* 设置下拉菜单项文本颜色为黑色 */
}

.custom-dropdown-menu .dropdown-item:hover {
  background-color: #f0f0f0 !important; /* 设置下拉菜单项悬停时背景颜色 */
}

</style>
