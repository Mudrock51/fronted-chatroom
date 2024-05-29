<template>
  <nav class="chat-header navbar navbar-light bg-light">
    <div class="container-fluid">
      <div class="d-flex align-items-center">
        <img src="src/assets/avatar/avatar.png" alt="Avatar" class="avatar rounded-circle">
        <span class="navbar-brand mb-0 h1 ms-2">xuepeek Yang</span>
      </div>
      <div class="d-flex">
        <button class="btn btn-outline-secondary me-2" type="button">
          <i class="bi bi-search"></i>
        </button>
        <button class="btn btn-outline-secondary me-2" type="button">
          <i class="bi bi-telephone"></i>
        </button>
        <button class="btn btn-outline-secondary me-2" type="button">
          <i class="bi bi-camera-video"></i>
        </button>
        <button class="btn btn-outline-secondary" type="button">
          <i class="bi bi-info-circle"></i>
        </button>
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
</style>
