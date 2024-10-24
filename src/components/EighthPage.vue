<template>
  <div class="page-wrapper">
    <div class="content-box">
      <el-form
        :model="form"
        ref="form"
        label-position="left"
        @submit.prevent="handleSubmit"
      >
        <div v-for="(scenario, index) in scenarios" :key="index">
          <div
            v-if="index % 16 === 0 && index !== 0"
            class="attention-reminder"
          >
            <div class="title">注意力提醒</div>
            <p class="content">
              这个是注意力提醒，请您认真阅读题目进行作答，每个场景都有不同的限制条件，细微差别请注意辨别，如果感到疲惫可以休息一下眼睛：）
            </p>
            <el-checkbox v-model="attentionReminder"
              >好的，收到提醒</el-checkbox
            >
          </div>
          <h2>场景 {{ index + 1 }}</h2>
          <p>
            如果你的车现在<strong>{{ scenario.location }}</strong
            >，剩余电量在<strong>{{ scenario.batteryLevel }}</strong
            >之间，且有可以参与V2G的条件。
          </p>
          <p>在此场景，您的选择是:</p>
          <el-form-item
            :prop="'choices.' + index"
            :rules="[
              { required: true, message: '请勾选你的选择', trigger: 'change' },
            ]"
          >
            <el-radio-group v-model="form.choices[index]">
              <el-radio :label="'noBenefit'"
                >参与V2G，<strong>{{ scenario.benefit }}</strong></el-radio
              >
              <el-radio :label="'carbonReduction'"
                >参与V2G，没有任何收益，但会显示可以减15g碳（不是最后真的碳量，只是一个提示的作用）<br />
                可接受的最大放电程度（为了保护电池，最低剩余电量为20%）（滑动选择自己接受的电量，如果剩余电量低于20%就不能滑动了）</el-radio
              >
              <el-radio :label="'noParticipation'">不参与V2G</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>
      <div class="btn-container">
        <el-button type="primary" @click="handleSubmit">下一步</el-button>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      scenarios: [],
      form: {
        choices: Array(50).fill(""),
        dischargeLevels: Array(50).fill(20),
      },
      attentionReminder: false,
    };
  },
  created() {
    this.generateScenarios();
  },
  methods: {
    generateScenarios() {
      const locations = [
        "停放在家里",
        "停放在公司",
        "停放在商场",
        "处于紧急情况",
      ];
      const batteryLevels = ["100-80%", "80-50%", "50-30%"];
      const benefits = ["没有任何收益", "0.5元每度", "1元每度", "1.5元每度"];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 4; k++) {
            this.scenarios.push({
              location: locations[i],
              batteryLevel: batteryLevels[j],
              benefit: benefits[k],
            });
          }
        }
      }
      // Shuffle scenarios to randomize their order
      this.scenarios = this.scenarios.sort(() => Math.random() - 0.5);
    },
    getMaxDischarge(batteryLevel) {
      if (batteryLevel === "100-80%") return 80;
      if (batteryLevel === "80-50%") return 50;
      if (batteryLevel === "50-30%") return 30;
      return 20;
    },
    handleSubmit() {
      //   this.$refs.form.validate((valid) => {
      //     if (valid) {
      //       console.log("表单提交:", this.form);
      //       this.$router.push({ name: "NinthPage" }); // 跳转到下一个页面
      //     } else {
      //       console.log("表单验证失败");
      //       return false;
      //     }
      //   });
      console.log("表单提交:", this.form);
      this.$router.push({ name: "NinthPage" });
    },
  },
};
</script>
  
  <style scoped>
h1,
h2 {
  text-align: left;
  color: #3498db; /* 浅蓝色 */
}

strong {
  font-size: 1.2em;
  color: #000;
}
p {
  text-align: left;
}

.el-button {
  font-size: 18px;
  padding: 10px 20px;
  margin-top: 20px;
}
.attention-reminder {
  .title,
  .content {
    color: red;
  }
  text-align: left;
}
.el-radio {
  text-align: left;
}
</style>