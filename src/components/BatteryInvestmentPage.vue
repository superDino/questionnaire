<template>
  <div class="page-wrapper">
    <div class="content-box">
      <h1>电池投资</h1>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="300px"
        label-position="left"
        @submit.prevent="handleSubmit"
      >
        <el-form-item
          label="如果你现在决定购买一辆新的电动汽车，会选择以下哪个类型？"
          required
          prop="carChoice"
        >
          <el-radio-group v-model="form.carChoice">
            <el-radio :value="'和现在已有车辆类似'">和现在已有车辆类似</el-radio>
            <el-radio :value="'电池容量大，花较多的钱购买能参与V2G的电动汽车，获得有一定的收益'">
              电池容量大，花较多的钱购买能参与V2G的电动汽车，获得有一定的收益</el-radio
            >
            <el-radio :value="'电池容量大，花更多的钱购买更能参与V2G的电动汽车。同时，可以接受电池损耗,获得更多的收益'"
              >电池容量大，花更多的钱购买更能参与V2G的电动汽车。同时，可以接受电池损耗，<br>获得更多的收益</el-radio
            >
            <el-radio :value="'我不清楚'">我不清楚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="您的参与V2G的预期年收益为："
          required
          prop="expectedEarnings"
        >
          <el-radio-group v-model="form.expectedEarnings">
            <el-radio :value="'5千'">5千</el-radio>
            <el-radio :value="'5千-1万'">5千-1万</el-radio>
            <el-radio :value="'1-3万'">1-3万</el-radio>
            <el-radio :value="'3-5万'">3-5万</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="微信号" required>
          <el-input v-model="form.wechat" placeholder="请输入您的微信号"></el-input>
        </el-form-item>
        <div class="btn-container">
          <el-button type="primary" @click="handleSubmit">结束答题</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "NinthPage",
  data() {
    return {
      form: {
        carChoice: "",
        expectedEarnings: "",
        wechat: "",
        uuid: localStorage.getItem("uuid"),
      },
      rules: {
        carChoice: [
          { required: true, message: "请选择一个选项", trigger: "change" },
        ],
        expectedEarnings: [
          { required: true, message: "请选择一个选项", trigger: "change" },
        ],
        wechat: [
          { required: true, message: "请输入您的微信号", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log("表单提交:", this.form);
          this.$router.push({ name: "ThanksPage" }); // 跳转到下一个页面
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
  color: #3498db; /* 浅蓝色 */
}

.el-button {
  font-size: 18px;
  padding: 10px 20px;
  margin-top: 20px;
}
</style>