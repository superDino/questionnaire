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
            <el-radio label="similarToCurrent">和现在已有车辆类似</el-radio>
            <el-radio label="largeBatteryWithV2G"
              >电池容量大 花较多的钱 能参与V2G，有一定的收益</el-radio
            >
            <el-radio label="largerBatteryWithMoreV2G"
              >电池容量大 花更多的钱 更能参与V2G
              可以接受电池损耗，获得更多的收益</el-radio
            >
            <el-radio label="notSure">不知道</el-radio>
          </el-radio-group>
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
      },
      rules: {
        carChoice: [
          { required: true, message: "请选择一个选项", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
    //   this.$refs.form.validate((valid) => {
    //     if (valid) {
    //       console.log("表单提交:", this.form);
    //       this.$router.push({ name: "ThanksPage" }); // 跳转到下一个页面
    //     } else {
    //       console.log("表单验证失败");
    //       return false;
    //     }
    //   });
      console.log("表单提交:", this.form);
      this.$router.push({ name: "ThanksPage" }); // 跳转到下一个页面
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