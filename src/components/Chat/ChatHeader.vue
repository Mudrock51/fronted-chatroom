<template>
  <nav class="chat-header navbar navbar-light bg-light bg-body-tertiary">
    <div class="container-fluid">
      <div class="d-flex align-items-center">
        <img src="../../assets/avatar/avatar.jpg" alt="Avatar" class="avatar rounded-circle">
        <span class="navbar-brand mb-0 h1 ms-2">Kristen Taylor</span>
      </div>

      <div class="container-fluid">
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="在这里搜索用户、聊天记录或者文件..." aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'ChatHeader'
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

.d-flex {
  margin: 5px;
}
</style>
