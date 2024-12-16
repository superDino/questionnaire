<!-- src/components/WelcomePage.vue -->
<template>
  <div class="welcome-page">
    <h1>欢迎参与香港科技大学（广州）智能交通学域——V2G（车网互动）意愿调查</h1>
    <el-button type="primary" @click="navigateToHomePage">点击进入</el-button>
  </div>
</template>
  
  <script>
  import { v4 as uuidv4 } from 'uuid';
export default {
  created() {
    //保存uuid到本地  
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
  },
  methods: {
    navigateToHomePage() {
      console.log(localStorage.getItem("uuid"));
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