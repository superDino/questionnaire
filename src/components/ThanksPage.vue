<template>
  <div class="page-wrapper">
    <div class="content-box">
      <h1>感谢您的时间！</h1>
      <p>如果您遇到任何问题，请与我们联系！</p>
      <div class="btn-container">
        <el-button type="primary" @click="handleClose">结束问卷</el-button>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "ThanksPage",
  methods: {
    handleClose() {
      // 关闭网页
      window.open("about:blank","_self").close();  
    },
  },
};
</script>
  
  <style scoped>
h1 {
  color: #3498db; /* 浅蓝色 */
}
</style>