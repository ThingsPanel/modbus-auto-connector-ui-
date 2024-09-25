<template>
  <div class="device-list-container">
    <!-- 表头，带有添加按钮 -->
    <div class="header">
      <h1>设备配置列表</h1>
      <button class="add-btn" @click="addRecord">添加设备配置</button>
    </div>

    <!-- 设备列表表格 -->
    <table class="device-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Model</th>
        <th>制造商</th>
        <th>产品名称</th>
        <th>类型</th>
        <th>版本</th>
        <th>配置内容</th>
        <th>创建时间</th>
        <th>更新时间</th>
        <th>初始地址</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="device in paginatedDevices" :key="device.id">
        <td>{{ device.id }}</td>
        <td>{{ device.model }}</td>
        <td>{{ device.manufacturer }}</td>
        <td>{{ device.product_name }}</td>
        <td>{{ device.type }}</td>
        <td>{{ device.version }}</td>
        <td>
<!--          <pre>{{ formatJson(device.content) }}</pre>-->
          <button @click="openJsonDialog(device.content)">详情</button>
        </td>
        <td>{{ device.create_time }}</td>
        <td>{{ device.update_time }}</td>
        <td>{{ device.init_address }}</td>
        <td>
          <!-- 编辑和删除按钮 -->
          <button class="edit-btn" @click="editDevice(device.id)">Edit</button>
          <button class="delete-btn" @click="confirmDelete(device.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- 分页导航 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

    <!-- JSON 弹框展示 -->
    <div v-if="showJsonDialog" class="json-dialog">
      <div class="dialog-content">
        <h3>Device JSON Content</h3>
        <pre>{{ fullJsonContent }}</pre>
        <button @click="closeJsonDialog">Close</button>
      </div>
    </div>
    <!-- 删除确认弹框 -->
    <div v-if="showDeleteConfirm" class="json-dialog">
      <div class="dialog-content">
        <h3>删除确认</h3>
        <p>确认删除?</p>
        <button @click="deleteDevice">确认删除</button>
        <button @click="cancelDelete">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import {Del, List} from "@/api/api";

export default {
  name: 'DeviceList',
  data() {
    return {
      devices: [],
      currentPage: 1,  // 当前页码
      pageSize: 5,     // 每页显示的条数
      total : 0,
      showJsonDialog: false, // 控制 JSON 弹框显示
      fullJsonContent: '',   // 存储完整 JSON 内容
      showDeleteConfirm: false, // 控制删除确认弹框显示
      deviceIdToDelete: null,  // 存储要删除的设备ID
    };
  },
  computed: {
    // 当前分页的设备数据
     paginatedDevices() {
      return this.devices
    },
    // 总页数
    totalPages() {
      return  Math.ceil(this.total/this.pageSize);
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      try{
        const res = await List({
          page: this.currentPage,
          page_size: this.pageSize,
        });
        this.devices = res.data.list
        this.total = res.data.total
      }catch (e){
        console.log(e)
      }
    },
    // JSON 格式化显示
    formatJson(jsonString) {
      try {
        return JSON.stringify(JSON.parse(jsonString), null, 2);
      } catch (e) {
        return jsonString;
      }
    },
    // 打开 JSON 弹框
    openJsonDialog(content) {
      this.fullJsonContent = this.formatJson(content); // 格式化 JSON 数据
      this.showJsonDialog = true;
    },
    // 关闭 JSON 弹框
    closeJsonDialog() {
      this.showJsonDialog = false;
    },
    // 下一页
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    // 上一页
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // 添加记录按钮的点击事件
    addRecord() {
      // 跳转到添加记录的页面或弹出表单
      this.$router.push('/device-config');
    },
    // 编辑设备
    editDevice(deviceId) {
      // 跳转到设备编辑页面，传递设备ID
      this.$router.push({ path: `/device-config/${deviceId}` });
    },
    // 确认删除设备
    confirmDelete(deviceId) {
      this.deviceIdToDelete = deviceId;
      this.showDeleteConfirm = true;
    },
    // 取消删除
    cancelDelete() {
      this.showDeleteConfirm = false;
      this.deviceIdToDelete = null;
    },
    // 删除设备
    async deleteDevice() {
      try {
        await Del({
          id: this.deviceIdToDelete,
        });
        // 删除成功后，重新获取数据或从设备列表中移除
        this.devices = this.devices.filter(device => device.id !== this.deviceIdToDelete);
        this.showDeleteConfirm = false;
        this.deviceIdToDelete = null;
      } catch (error) {
        console.error('Failed to delete the device:', error);
      }
    }
  }
};
</script>

<style scoped>
/* 容器样式，限制宽度居中显示 */
.device-list-container {
  min-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 95%;
}

/* 表头和添加按钮样式 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-btn {
  background-color: #6e8efb;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.add-btn:hover {
  background-color: #5a79e0;
}

/* 表格样式 */
.device-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  text-align: left;
  font-family: 'Arial', sans-serif;
}

.device-table th, .device-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.device-table th {
  background-color: #6e8efb;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}

.device-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.device-table tr:hover {
  background-color: #ddd;
}

.device-table td {
  color: #333;
}

.device-table td:nth-child(1) {
  font-weight: bold;
}

.device-table td:nth-child(9) {
  font-style: italic;
}
/* 操作按钮样式 */
.edit-btn, .delete-btn {
  margin-right: 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 14px;
}

.edit-btn {
  background-color: #5a9ef0;
}

.edit-btn:hover {
  background-color: #3a7ee0;
}

.delete-btn {
  background-color: #ff4d4d;
}

.delete-btn:hover {
  background-color: #d43f3f;
}

/* JSON 弹框样式 */
.json-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  text-align: left;
}

.dialog-content h3 {
  margin-top: 0;
}

.dialog-content pre {
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 5px;
  max-height: 60vh;
  overflow-y: auto;
}

.dialog-content button {
  background-color: #6e8efb;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 15px;
}

.dialog-content button:hover {
  background-color: #5a79e0;
}


/* 分页样式 */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #6e8efb;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-weight: bold;
}
</style>
