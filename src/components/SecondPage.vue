<template>
  <div class="page-wrapper">
    <div class="content-box">
      <h1>电动汽车车主参与V2G（车网互动）意愿调查</h1>
      <div class="researchers-info">
        <p>研究人员：</p>
        <p class="bullet">韦玮博士，助理教授</p>
        <p>香港科技大学（广州）智能交通学域、碳中和和气候变化学域</p>
        <p>邮箱：wwei@hkust-gz.edu.cn</p>
        <p class="bullet">陈艺纯，硕士研究生</p>
        <p>香港科技大学（广州）智能交通学域</p>
        <p>邮箱：ychen458@connect.hkust-gz.edu.cn</p>
      </div>
      <h2>以下为该实验的知情同意书，请您认真阅读。</h2>
      <div class="scrollable-content">
        <p>尊敬的参与者，</p>
        <p>
          感谢您抽出时间参与我们的研究。本研究旨在调查电动汽车车主参与V2G（车网互动）的意愿和决定因素。如果您目前还不了解V2G的具体概念，稍后我们将给你提供相应信息。
        </p>
        <h3>研究目的：</h3>
        <p>
          本研究希望了解电动汽车车主对V2G技术的认识、参与意愿以及可能会影响参与程度的因素。
        </p>
        <h3>参与内容：</h3>
        <p>
          参与者将被要求填写一份在线问卷，预计需时约？分钟，中间不能中断，请您选择合适的时间开始问卷作答。问卷内容包括个人的基本信息和驾驶相关信息，您对V2G技术的了解和态度、场景模拟。
        </p>
        <h3>风险和益处：</h3>
        <p>
          本研究的风险极小，但如果您对某些问题感到不适，可以随时退出调查。参与本研究有助于新能源科技进步和绿色低碳政策制定，您的反馈将会影响未来V2G技术的推广和应用。
        </p>
        <h3>保密性：</h3>
        <p>
          您的所有回答将严格保密，仅用于研究目的。研究报告中不会出现任何可以识别个人身份的信息。
        </p>
        <h3>联系信息：</h3>
        <p>
          如果您对本研究有任何疑问，或希望获取更多信息，请随时与我们联系：陈艺纯
          ychen458@connect.hkust-gz.edu.cn
        </p>
        <p>
          通过签署本知情同意书，您表示您已经阅读并理解上述信息，并自愿同意参与本研究。请在下方签署您的姓名。
        </p>
      </div>
      <el-form :model="form" class="consent-form">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="btn-container">
            <el-button type="primary" @click="submitConsent">签署</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      form: {
        name: "",
        date: new Date().toISOString().substr(0, 10), // 自动生成当前日期
      },
    };
  },
  methods: {
    submitConsent() {
      if (this.form.name && this.form.date) {
        this.$router.push({ name: "ThirdPage" });
      } else {
        this.$message.error("请填写完整的姓名和日期");
      }
    },
  },
};
</script>
  
  <style scoped>
.scrollable-content {
  max-height: 300px; /* 设置最大高度 */
  overflow-y: auto; /* 使内容可滚动 */
  padding: 10px;
  border: 1px solid #ccc; /* 明显的边框 */
  border-radius: 8px;
  background-color: #fff; /* 白色背景 */
}

.scrollable-content h3 {
  font-weight: bold; /* 加粗 */
  color: #000; /* 黑色 */
}
.researchers-info,
.scrollable-content {
  text-align: left; /* 确保内容左对齐 */
}
h1,
h2 {
  color: #3498db; /* 浅蓝色 */
}
.bullet::before {
  content: '•'; /* 添加黑色圆点 */
  color: black;
  display: inline-block;
  width: 1em;
  /* margin-left: -1em; */
}
.consent-form {
  margin-top: 20px; /* 增加与上面内容的距离 */
  text-align: left; /* 向左对齐 */
}
</style>