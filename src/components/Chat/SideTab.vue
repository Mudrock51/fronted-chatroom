<template>
  <div class="side-tab d-flex flex-column flex-shrink-0 p-3 bg-white" style="width: 250px;">
    <h2 class="side-tab__title fs-4">{{ title }}</h2>
    <ul class="nav nav-pills flex-column mb-auto">
      <template v-if="contentType === 'list'">
        <li v-for="item in listItems" :key="item" class="nav-item">
          <a href="#" class="nav-link" @click.prevent="selectUser(item)">
            {{ item }}
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
export default {
  name: "SideTab",
  props: {
    title: {
      type: String,
      default: '功能菜单'
    },
    contentType: {
      type: String,
      default: 'list' // 可选值: 'list', 'text'
    },
    listItems: {
      type: Array,
      default: () => ['选项 1', '选项 2', '选项 3']
    },
    textContent: {
      type: String,
      default: ''
    },
  },
  methods: {
    selectUser(user) {
      this.$emit('selectUser', user);
    }
  }
}
</script>

<style scoped>
.side-tab {
  background-color: #f0f8ff; /* 淡蓝色背景 */
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加阴影 */
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

.btn-primary {
  padding: 10px 20px;
  font-size: 1em;
  background-color: #1e90ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

</style>
