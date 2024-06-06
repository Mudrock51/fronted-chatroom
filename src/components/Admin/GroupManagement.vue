<template>
  <div class="group-panel">
    <h2 class="title">群组信息管理平台</h2>
    <div class="filter-container">
      <input v-model="searchTerm" class="filter-input" placeholder="按群组名称查询">
      <button @click="filterGroups" class="filter-button">查询</button>
    </div>
    <table class="groups-table">
      <thead>
      <tr>
        <th>群组ID</th>
        <th>群组名称</th>
        <th>成员数</th>
        <th>详细信息</th>
        <th>修改</th>
        <th>删除</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(group, index) in filteredGroups" :key="group.groupId">
        <td>{{ group.groupId }}</td>
        <td>{{ group.groupName }}</td>
        <td>{{ group.memberCount }}</td>
        <td><button @click="viewDetails(group)" class="action-button">详细信息</button></td>
        <td><button @click="editGroup(group)" class="action-button">修改</button></td>
        <td><button @click="deleteGroup(group.groupId, index)" class="action-button">删除</button></td>
      </tr>
      </tbody>
    </table>
    <button @click="addGroup" class="add-button">创建群组</button>

    <!-- 模态框 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ isEditMode ? '修改群组信息' : '创建群组' }}</h2>
        <div class="form-group">
          <label for="groupName">群组名称:</label>
          <input type="text" v-model="currentGroup.groupName" id="groupName">
        </div>
        <button @click="saveGroup" class="save-button">{{ isEditMode ? '保存' : '创建' }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GroupManagement',
  data() {
    return {
      searchTerm: '',
      groups: [],
      filteredGroups: [],
      showModal: false,
      isEditMode: false,
      currentGroup: {
        groupId: null,
        groupName: '',
        memberCount: 0
      }
    };
  },
  methods: {
    async fetchGroups() {
      try {
        const response = await axios.get('/group/all');
        this.groups = response.data;
        this.filteredGroups = this.groups;
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    },
    filterGroups() {
      if (this.searchTerm) {
        this.filteredGroups = this.groups.filter(group => group.groupName.includes(this.searchTerm));
      } else {
        this.filteredGroups = this.groups;
      }
    },
    viewDetails(group) {
      alert(`详细信息：\n群组ID: ${group.groupId}\n群组名称: ${group.groupName}\n成员数: ${group.memberCount}`);
    },
    editGroup(group) {
      this.currentGroup = { ...group };
      this.isEditMode = true;
      this.showModal = true;
    },
    deleteGroup(groupId, index) {
      if (confirm('确定要删除这个群组吗？')) {
        axios.delete(`/group/${groupId}`).then(() => {
          this.filteredGroups.splice(index, 1);
        }).catch(error => {
          console.error('Error deleting group:', error);
        });
      }
    },
    addGroup() {
      this.currentGroup = {
        groupId: null,
        groupName: '',
        memberCount: 0
      };
      this.isEditMode = false;
      this.showModal = true;
    },
    async saveGroup() {
      if (this.isEditMode) {
        try {
          await axios.put(`/group/${this.currentGroup.groupId}`, this.currentGroup);
          this.fetchGroups();
          this.closeModal();
        } catch (error) {
          console.error('Error updating group:', error);
        }
      } else {
        try {
          await axios.post('/group', this.currentGroup);
          this.fetchGroups();
          this.closeModal();
        } catch (error) {
          console.error('Error adding group:', error);
        }
      }
    },
    closeModal() {
      this.showModal = false;
    }
  },
  mounted() {
    this.fetchGroups();
  }
};
</script>

<style scoped>
.group-panel {
  flex-grow: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #007bff;
}

.filter-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-input {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.filter-button {
  padding: 5px 20px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-button:hover {
  background-color: #0056b3;
}

.groups-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.groups-table th, .groups-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.groups-table th {
  background-color: #f7f7f7;
}

.action-button {
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #218838;
}

.add-button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #17a2b8;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #138496;
}

/* 模态框样式 */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.close {
  float: right;
  font-size: 24px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.save-button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #218838;
}
</style>
