<template>
  <div class="file-panel">
    <h2 class="title">文件管理平台</h2>
    <div class="upload-container">
      <input type="file" @change="onFileChange">
      <button @click="uploadFile" class="upload-button">上传文件</button>
    </div>
    <table class="files-table">
      <thead>
      <tr>
        <th>文件ID</th>
        <th>文件名称</th>
        <th>文件大小</th>
        <th>上传日期</th>
        <th>下载</th>
        <th>删除</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(file, index) in files" :key="file.fileId">
        <td>{{ file.fileId }}</td>
        <td>{{ file.fileName }}</td>
        <td>{{ file.fileSize }}</td>
        <td>{{ file.uploadDate }}</td>
        <td><button @click="downloadFile(file)" class="action-button">下载</button></td>
        <td><button @click="deleteFile(file.fileId, index)" class="action-button">删除</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FileManagement',
  data() {
    return {
      files: [],
      selectedFile: null
    };
  },
  methods: {
    async fetchFiles() {
      try {
        const response = await axios.get('/file/all');
        this.files = response.data;
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadFile() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        try {
          await axios.post('/file/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.fetchFiles();
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    },
    async downloadFile(file) {
      try {
        const response = await axios.get(`/file/download/${file.fileId}`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    },
    async deleteFile(fileId, index) {
      if (confirm('确定要删除这个文件吗？')) {
        try {
          await axios.delete(`/file/${fileId}`);
          this.files.splice(index, 1);
        } catch (error) {
          console.error('Error deleting file:', error);
        }
      }
    }
  },
  mounted() {
    this.fetchFiles();
  }
};
</script>

<style scoped>
.file-panel {
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

.upload-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.upload-button {
  padding: 5px 20px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #0056b3;
}

.files-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.files-table th, .files-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.files-table th {
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
</style>
