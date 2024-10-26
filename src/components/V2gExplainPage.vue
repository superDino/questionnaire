<template>
  <div class="page-wrapper">
    <div class="content-box">
      <h1>V2G（车网互动）意愿调查</h1>
      <div v-if="group === 'detailed'">
        <h2>详细讲解</h2>
        <p>
          V2G（Vehicle-to-Grid），即车网互动，是指电动汽车与电网之间的双向能量交换技术。它不仅允许电动车从电网充电，而且还能让电动车在不驾驶时将电能反馈给电网。这一过程为电网提供了调节能力，帮助平衡供需，特别是在高峰时段或可再生能源供电不稳定的情况下。从能量的角度看，每辆车平均电量大于65千瓦时，则3亿辆车载储能容量超过200亿千瓦时，与中国目前每天消费总电量基本相当。从碳减排的角度看，在火电比例约束的情况下，到2050年，与无序充电场景相比，V2G可以减少27%的二氧化碳排放量，年均减碳量可达7亿吨。（中国科学院院士，清华大学车辆与运载学院教授
          欧阳明高，2022）具体来说，V2G技术能显著提高可再生能源的利用率，减少化石燃料发电的依赖，从而减少温室气体排放和空气污染。通过优化电网的能源组合，V2G有助于实现更清洁、更可持续的能源生态系统。此外，V2G还能提高电网的灵活性和稳定性，促进能源的高效利用。
        </p>
        <p>
          对于电动车主而言，V2G不仅可以减少他们的充电成本，通过在电价较低时充电，并在电价高时卖电，还能为他们带来额外收入。在丹麦，V2G技术已被广泛应用。丹麦的一项试点项目显示，参与V2G的电动汽车车主每年可获得约1300欧元的收入。（丹麦科技大学，2019）
        </p>
      </div>
      <div v-else>
        <h2>简短介绍</h2>
        <p>
          V2G即车网互动，是指电动汽车与电网之间的双向能量交换技术。这项技术不仅允许电动汽车从电网充电，还能将车载电池中的电能反馈回电网。既能减轻了电网负担，也为车主带来了经济收益。
        </p>
      </div>
      <div class="btn-container">
        <el-button
          :disabled="isButtonDisabled"
          type="primary"
          @click="navigateToSurvey"
        >
          进入问卷 {{ countdown > 0 ? `(${countdown}s)` : "" }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      group: "",
      isButtonDisabled: true,
      countdown: 10,
    };
  },
  created() {
    this.assignGroup();
    this.startCountdown();
  },
  methods: {
    assignGroup() {
      // 随机分配用户到对照组或详细讲解组
      this.group = Math.random() < 0.5 ? "detailed" : "brief";
    },
    startCountdown() {
      const interval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          this.isButtonDisabled = false;
          clearInterval(interval);
        }
      }, 1000);
    },
    navigateToSurvey() {
      this.$router.push({ name: "BasicInfoPage" });
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9; /* 灰色背景 */
}

.content-box {
  max-width: 800px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #e9ecef; /* 灰色框框 */
  text-align: left;
}

h1,
h2 {
  color: #3498db; /* 浅蓝色 */
  text-align: center
}

.btn-container {
  margin-top: 20px;
}

.el-button {
  font-size: 18px;
  padding: 10px 20px;
}
</style>