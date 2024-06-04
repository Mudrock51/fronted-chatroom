<template>
  <nav class="chat-header navbar navbar-light bg-light bg-body-tertiary">
    <div class="container-fluid">
      <div class="d-flex align-items-center">
        <img src="../../assets/avatar/avatar.jpg" alt="Avatar" class="avatar rounded-circle">
        <span class="navbar-brand mb-0 h1 ms-2">{{ username }}</span>
      </div>

      <div class="container-fluid">
        <form class="d-flex search-form" role="search">
          <input class="form-control search-input me-2" type="search" placeholder="在这里搜索用户、聊天记录或者文件..." aria-label="Search">
          <svg class="position-absolute search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.927 17.0401L20.4001 20.4001M11.4001 7.2001C13.3883 7.2001 15.0001 8.81187 15.0001 10.8001M19.2801 11.4401C19.2801 15.77 15.77 19.2801 11.4401 19.2801C7.11018 19.2801 3.6001 15.77 3.6001 11.4401C3.6001 7.11018 7.11018 3.6001 11.4401 3.6001C15.77 3.6001 19.2801 7.11018 19.2801 11.4401Z" stroke="black" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'ChatHeader',
  props: {
    username: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.chat-header {
  background-color: #f0f8ff; /* 淡蓝色背景 */
}
.avatar {
  width: 40px;
  height: 40px;
}

.search-icon {
  position: absolute; /* 绝对定位 */
  left: 0.75rem; /* 设置SVG图标的位置 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 垂直居中 */
  pointer-events: none; /* 使图标不可点击 */
}
.search-input {
  width: 100%;
  padding-left: 2.5rem; /* 为输入框左侧添加内边距，以确保SVG不覆盖文本 */
}

.search-form {
  position: relative;
}

.d-flex {
  margin: 5px;
}
</style>
