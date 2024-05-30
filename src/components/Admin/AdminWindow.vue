<template>
  <div class="admin-panel">
    <h2 class="title">用户信息管理平台</h2>
    <div class="filter-container">
      <select v-model="selectedClass" class="filter-select">
        <option value="">按姓名查询:</option>
        <option v-for="classItem in classes" :key="classItem" :value="classItem">{{ classItem }}</option>
      </select>
      <button @click="filterStudents" class="filter-button">查询</button>
    </div>
    <table class="students-table">
      <thead>
      <tr>
<!--        test-->
        <th>用户ID</th>
        <th>姓名</th>
        <th>邮箱</th>
        <th>年龄</th>
        <th>在线状态</th>
        <th>详细信息</th>
        <th>修改</th>
        <th>删除</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(student, index) in filteredStudents" :key="index">
        <td>{{ student.id }}</td>
        <td>{{ student.name }}</td>
        <td>{{ student.class }}</td>
        <td>{{ student.age }}</td>
        <td>{{ student.score }}</td>
        <td><button @click="viewDetails(student)" class="action-button">详细信息</button></td>
        <td><button @click="editStudent(student)" class="action-button">修改</button></td>
        <td><button @click="deleteStudent(index)" class="action-button">删除</button></td>
      </tr>
      </tbody>
    </table>
    <button @click="addStudent" class="add-button">录入用户信息</button>
  </div>
</template>

<script>
export default {
  name: 'AdminPanel',
  data() {
    return {
      selectedClass: '',
      classes: ['Java1105', 'Java1106', 'Java1107'],
      students: [
        { id: '110502', name: '李宏伟', class: 'Java1105', age: 22, score: 90.0 },
        { id: '110503', name: '张学伟', class: 'Java1105', age: 22, score: 90.0 },
        { id: '110507', name: '梁朝晖', class: 'Java1105', age: 22, score: 90.0 },
        { id: '110508', name: '杨帆', class: 'Java1105', age: 21, score: 90.0 },
        { id: '110509', name: '药诚', class: 'Java1105', age: 24, score: 90.0 }
      ],
      filteredStudents: []
    };
  },
  methods: {
    filterStudents() {
      if (this.selectedClass) {
        this.filteredStudents = this.students.filter(student => student.class === this.selectedClass);
      } else {
        this.filteredStudents = this.students;
      }
    },
    viewDetails(student) {
      alert(`详细信息：\n学号: ${student.id}\n姓名: ${student.name}\n班级: ${student.class}\n年龄: ${student.age}\n分数: ${student.score}`);
    },
    editStudent(student) {
      alert(`编辑用户信息：${student.name}`);
    },
    deleteStudent(index) {
      if (confirm('确定要删除这条信息吗？')) {
        this.filteredStudents.splice(index, 1);
      }
    },
    addStudent() {
      alert('录入用户信息');
    }
  },
  mounted() {
    this.filterStudents();
  }
}
</script>

<style scoped>
.admin-panel {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.filter-select {
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

.students-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.students-table th, .students-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.students-table th {
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
</style>
