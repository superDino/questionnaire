<!-- src/components/WelcomePage.vue -->
<template>
  <div class="welcome-page">
    <h1>欢迎参与香港科技大学（广州）智能交通学域——V2G（车网互动）意愿调查</h1>
    <el-button type="primary" @click="navigateToHomePage">点击进入</el-button>
  </div>
</template>
  
  <script>
export default {
  methods: {
    navigateToHomePage() {
      this.$router.push({ name: "ConditionPage" });
    },
  },
};
</script>
  
  <style scoped>
.welcome-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  color: #3498db; /* 浅蓝色 */
}

.el-button {
  font-size: 18px;
  padding: 10px 20px;
}
</style>