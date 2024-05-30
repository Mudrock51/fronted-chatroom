<template>
  <nav class="navbar navbar-light bg-light bg-body-tertiary">

    <div class="container-fluid custom-background rounded mb-0">
      <div class="d-flex search-form-container me-auto">
        <form class="d-flex search-form position-relative" role="search">
          <input class="form-control search-input ps-5" type="search" placeholder="搜索有关功能" aria-label="Search">
          <svg class="position-absolute search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.927 17.0401L20.4001 20.4001M11.4001 7.2001C13.3883 7.2001 15.0001 8.81187 15.0001 10.8001M19.2801 11.4401C19.2801 15.77 15.77 19.2801 11.4401 19.2801C7.11018 19.2801 3.6001 15.77 3.6001 11.4401C3.6001 7.11018 7.11018 3.6001 11.4401 3.6001C15.77 3.6001 19.2801 7.11018 19.2801 11.4401Z" stroke="black" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </form>
      </div>

      <div class="d-flex align-items-center ms-auto">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.3995 21.6L20.3998 18.0003C20.4 16.012 18.7881 14.4 16.7998 14.4H7.2005C5.21244 14.4 3.60073 16.0116 3.6005 17.9996L3.6001 21.6M15.6001 6.00002C15.6001 7.98825 13.9883 9.60002 12.0001 9.60002C10.0119 9.60002 8.4001 7.98825 8.4001 6.00002C8.4001 4.0118 10.0119 2.40002 12.0001 2.40002C13.9883 2.40002 15.6001 4.0118 15.6001 6.00002Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="navbar-brand mb-0 h1 ms-2 admin-text">管理员</span>
      </div>

    </div>







  </nav>
</template>

<script>
export default {
  name: 'AdminHeader'
}
</script>

<style scoped>



.d-flex {
  margin: 5px;
}


.custom-background {
  background-color: #1160b1; /* 较深的蓝色背景 */
  border-radius: 0.5rem; /* 适当的圆角 */
  padding: 0.5rem; /* 适当的内边距 */
}
.search-form {
  flex-grow: 1;
  position: relative; /* 设置相对定位 */
}


.search-form {
  position: relative; /* 使表单内的元素可以相对定位 */
}

.search-input {
  width: 100%;
  padding-left: 2.5rem; /* 为输入框左侧添加内边距，以确保SVG不覆盖文本 */
}

.search-icon {
  position: absolute; /* 绝对定位 */
  left: 0.75rem; /* 设置SVG图标的位置 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 垂直居中 */
  pointer-events: none; /* 使图标不可点击 */
}

.admin-text{
  color: #000000;
}

</style>
