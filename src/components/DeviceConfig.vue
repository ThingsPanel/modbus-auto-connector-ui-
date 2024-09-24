<template>
  <div class="device-config-container">
    <h1 class="title">{{ isEdit ? 'Edit Device Configuration' : 'Add Device Configuration' }}</h1>
    <form @submit.prevent="submitForm" class="device-form">
      <div class="form-group-row">
        <div class="form-group">
          <label for="model">Model:</label>
          <input type="text" id="model" v-model="formData.model" required />
        </div>
      </div>
      <div class="form-group-row">
        <div class="form-group">
          <label for="version">版本:</label>
          <input type="text" id="version" v-model="formData.version" required />
        </div>
        <div class="form-group">
          <label for="init_address">初始地址:</label>
          <input type="text" id="init_address" v-model="formData.init_address" required />
        </div>
      </div>
      <div class="form-group">
        <label for="content">Content (JSON 格式):</label>
        <textarea
            id="content"
            v-model="formData.content"
            rows="10"
            placeholder='{"key": "value"}'
            required
            @blur="validateJSON"
        ></textarea>
        <p class="json-hint">请使用有效的 JSON 格式，例如: {"key": "value"}</p>
      </div>
      <button type="submit" class="submit-btn">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>
    <button class="back-btn" @click="goBack">Back to Device List</button>
  </div>
</template>

<script>
import {Add, Edit, Info} from "@/api/api";

export default {
  name: 'DeviceConfig',
  data() {
    return {
      isEdit: false,
      formData: {
        model: '',
        type: null,
        version: '',
        content: '',
        init_address: ''
      },
      id: ''
    };
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.isEdit = true;
      this.id = id;
      this.fetchDeviceData(id);
    }
  },
  methods: {
    async fetchDeviceData(id) {
      console.log(id);
      try{
        // 通过 API 获取设备数据并填充表单
        const res = await Info({id: id})
        console.log(res);
        this.formData = res.data;
        // eslint-disable-next-line no-empty
      }catch (e){

      }

    },
    validateJSON() {
      try {
        JSON.parse(this.formData.content);
      } catch (e) {
        alert('请输入有效的 JSON 格式!');
      }
    },
    async submitForm() {
      // 提交表单数据
      try {
        const contentJSON = JSON.parse(this.formData.content);
        console.log(contentJSON)
        const params = {
          model: this.formData.model,
          type: 1,
          version: this.formData.version,
          content: contentJSON,
          init_address: this.formData.init_address,
        }
        if (this.isEdit){
          params.id = this.id
          await Edit(params);
        }else{
          await Add(params);
        }

        this.$router.push({ name: 'device-config-list' });
        // 继续提交逻辑
      } catch (e) {
        alert('请输入有效的 JSON 格式!');
      }
    },
    goBack() {
      this.$router.push({ name: 'device-config-list' });
    }
  }
};
</script>

<style scoped>
.device-config-container {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
}

.title {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.device-form {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
  margin-right: 60px; /* 右边距 */
}


label {
  font-weight: bold;
  margin-bottom: 5px;
}

input, textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
}

textarea {
  resize: none;
}

.json-hint {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

.submit-btn {
  padding: 10px;
  background-color: #6e8efb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #5a79e0;
}

.back-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.back-btn:hover {
  background-color: #d1d1d1;
}
</style>
