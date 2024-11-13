<template>
  <div class="page-wrapper">
    <div class="content-box">
      <h1>V2G 场景模拟</h1>
      <p>
        接下来会进行V2G场景模拟，屏幕前会随机出现一个设定好的V2G场景，您需要判断在当前情境下，您会做出怎样的选择。注意每个场景都有不同的限制条件，细微差别请注意辨别。一共有48道题，需要您全部作答。
      </p>
      <div class="btn-wrapper">
        <el-button :disabled="timer > 0" type="primary" @click="handleSubmit">
          {{ timer > 0 ? `开始答题（${timer}） ` : '开始答题' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeventhPage",
  data() {
    return {
      timer: 5,
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      const interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    },
    handleSubmit() {
      this.$router.push({ name: "V2gScenarioPage" }); // 跳转到下一个页面
    },
  },
};
</script>

<style scoped>
h1 {
  color: #3498db; /* 浅蓝色 */
}
p {
  line-height: 30px;
  text-align: left;
}
</style>