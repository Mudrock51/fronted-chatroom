<template>
  <div>
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import UserManagement from './UserManagement.vue';
import GroupManagement from './GroupManagement.vue';
import FileManagement from './FileManagement.vue';
import Settings from './Settings.vue';

export default {
  name: 'AdminWindow',
  props: {
    selectedItem: {
      type: String,
      required: true
    }
  },
  computed: {
    currentComponent() {
      switch (this.selectedItem) {
        case 'UserManagement':
          return UserManagement;
        case 'GroupManagement':
          return GroupManagement;
        case 'FileManagement':
          return FileManagement;
        case 'Settings':
          return Settings;
        default:
          return UserManagement;
      }
    }
  }
}
</script>
