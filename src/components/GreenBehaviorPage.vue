<template>
  <div class="page-wrapper">
    <div class="content-box">
      <h1>对绿色行为的调查</h1>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="200px"
        label-position="left"
        @submit.prevent="handleSubmit"
      >
        <el-form-item
          label="日常生活中是否会有绿色行为："
          required
          prop="greenBehavior"
        >
          <el-radio-group v-model="form.greenBehavior">
            <el-radio :value="'不太在意'">不太在意</el-radio>
            <el-radio :value="'会在意'">会在意</el-radio>
            <el-radio :value="'非常在意'">非常在意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="日常会做的绿色行为是："
          required
          prop="greenActions"
        >
          <el-checkbox-group v-model="form.greenActions">
            <el-checkbox :value="'关注低碳新闻'">关注低碳新闻</el-checkbox>
            <el-checkbox :value="'回收一次性塑料瓶'">回收一次性塑料瓶</el-checkbox>
            <el-checkbox :value="'垃圾分类'">垃圾分类</el-checkbox>
            <el-checkbox :value="'随手关灯'">随手关灯</el-checkbox>
            <el-checkbox :value="'空调不低于26度'">空调不低于26度</el-checkbox>
            <el-checkbox :value="'其他'">其他</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="btn-wrapper">
          <el-button type="primary" @click="handleSubmit">下一步</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
  
  <script>
import api from '@/api';

export default {
  data() {
    return {
      form: {
        greenBehavior: "",
        greenActions: [],
        uuid: localStorage.getItem("uuid"),
      },
      rules: {
        greenBehavior: [
          {
            required: true,
            message: "请选择您的绿色行为态度",
            trigger: "change",
          },
        ],
        greenActions: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "请选择至少一个绿色行为",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate( async (valid) => {
        if (valid) {
          console.log("表单提交:", this.form);
          try {
            const response = await api.saveBasicInfo(this.form);
            console.log(response);
            if (response.status === 200) {
              this.$router.push({ name: "V2gScenarioTipsPage" });
            } else {
              this.$message.error(response.message);
            }
          } catch (error) {
            console.error(error);
            this.$message.error("提交失败，请稍后重试");
          }
        } else {
          console.log("表单验证失败");
          return false;
        }
      });
    },
  },
};
</script>
  
  <style scoped>
h1 {
  color: #3498db;
}
</style>