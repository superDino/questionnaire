<template>
  <div class="page-wrapper">
    <div class="content-box">
      <el-form :model="form" :rules="rules" ref="form" label-position="left">
        <div class="scenario-group">
          <div class="image-wrapper">
            <img
              :src="getImage(currentGroupScenarios[0].location)"
              alt="location image"
              class="location-image"
            />
          </div>
          <div
            v-for="(scenario, index) in currentGroupScenarios"
            :key="index"
            class="scenario-content"
          >
            <h2>问题 {{ currentGroup * 3 + index + 1 }}</h2>
            <div class="scenario-text">
              <p>
                如果你的车现在<strong>{{ scenario.location }}</strong
                >，剩余电量在<strong>{{ scenario.batteryLevel }}</strong
                >之间，且有可以参与V2G的条件。<strong
                  >已知当前充电费用为1元/度。</strong
                >
              </p>
              <p>在此场景，您的选择是:</p>
              <el-form-item
                :prop="'choices.' + (currentGroup * 3 + index)"
                :rules="[
                  {
                    required: true,
                    message: '请对此场景做出您的选择',
                    trigger: 'change',
                  },
                ]"
              >
                <el-radio-group
                  v-model="form.choices[currentGroup * 3 + index]"
                  @change="handleChoiceChange(currentGroup * 3 + index)"
                >
                  <el-radio :value="'参与V2G，' + scenario.benefit"
                    >参与V2G，<strong>{{ scenario.benefit }}</strong></el-radio
                  >
                  <el-radio
                    :value="
                      '参与V2G，' +
                      scenario.benefit +
                      '，参与此次V2G可以帮助减碳15g'
                    "
                    >参与V2G，<strong>{{ scenario.benefit }}，</strong
                    >参与此次V2G可以帮助减碳15g</el-radio
                  >
                  <el-radio :value="'不参与V2G'">不参与V2G</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                v-if="
                  form.choices[currentGroup * 3 + index] !== '不参与V2G' &&
                  form.choices[currentGroup * 3 + index] !== ''
                "
                :prop="'dischargeLevels.' + (currentGroup * 3 + index)"
                :rules="[
                  {
                    required: true,
                    message: '请选择可接受的最大放电程度',
                    trigger: 'change',
                  },
                ]"
              >
                <p>可接受的最大放电程度（为了保护电池，最低剩余电量为20%）</p>
                <el-slider
                  v-model="form.dischargeLevels[currentGroup * 3 + index]"
                  :min="0"
                  :max="100"
                  :step="1"
                  show-input
                  :format-tooltip="formatTooltip"
                  @change="handleSliderChange(currentGroup * 3 + index)"
                  type="info"
                ></el-slider>
                <p class="remaining-battery">
                  剩余电量:
                  {{ 100 - form.dischargeLevels[currentGroup * 3 + index] }}%
                </p>
              </el-form-item>
              <el-form-item
                v-if="form.choices[currentGroup * 3 + index] === '不参与V2G'"
                :prop="'reasons.' + (currentGroup * 3 + index)"
                :rules="[
                  {
                    required: true,
                    message: '请填写不参与的具体原因',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  type="textarea"
                  v-model="form.reasons[currentGroup * 3 + index]"
                  placeholder="请填写不参与的具体原因"
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="btn-container">
          <el-button v-if="currentGroup > 0" @click="handlePreviousGroup"
            >上一页</el-button
          >
          <el-button
            v-if="currentGroup < 15"
            type="primary"
            @click="handleNextGroup"
          >
            下一页
          </el-button>
          <el-button
            v-if="currentGroup === 15"
            @click="handleComplete"
            type="primary"
            >完成</el-button
          >
        </div>
      </el-form>
      <el-dialog
        title="注意力提醒"
        v-model="attentionReminderVisible"
        width="30%"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        custom-class="attention-dialog"
      >
        <p style="color: red">
          这个是注意力提醒，请您认真阅读题目进行作答，每个场景都有不同的限制条件，细微差别请注意辨别，如果感到疲惫可以休息一下眼睛：）
        </p>
        <el-checkbox
          v-model="attentionReminder"
          @change="handleAttentionReminder"
          class="attention-checkbox"
          >好的，收到提醒</el-checkbox
        >
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scenarios: [],
      form: {
        choices: Array(48).fill(""),
        dischargeLevels: Array(48).fill(0),
        reasons: Array(48).fill(""),
      },
      rules: {
        choices: [
          {
            required: true,
            message: "请对此场景做出您的选择",
            trigger: "change",
          },
        ],
        dischargeLevels: [
          {
            required: true,
            message: "请选择可接受的最大放电程度",
            trigger: "change",
          },
        ],
        reasons: [
          {
            required: true,
            message: "请填写不参与的具体原因",
            trigger: "blur",
          },
        ],
      },
      currentGroup: 0,
      attentionReminder: false,
      attentionReminderVisible: false,
      savedForms: [],
      allData: [],
    };
  },
  computed: {
    currentGroupScenarios() {
      return this.scenarios.slice(
        this.currentGroup * 3,
        this.currentGroup * 3 + 3
      );
    },
    isAttentionReminderVisible() {
      return this.currentGroup === 5 || this.currentGroup === 11;
    },
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
        "需要应急供电，且就在附近",
      ];
      const batteryLevels = ["100%左右", "80%左右", "50%左右"];
      const benefits = [
        "没有奖励",
        "收益为0.5元每度",
        "收益为1元每度",
        "收益为1.5元每度",
      ];
      const usedCombinations = new Set();

      // 打乱 locations 和 benefits 数组的顺序
      const shuffledLocations = locations.sort(() => Math.random() - 0.5);
      const shuffledBenefits = benefits.sort(() => Math.random() - 0.5);

      while (this.scenarios.length < 48) {
        for (const location of shuffledLocations) {
          for (const benefit of shuffledBenefits) {
            for (const batteryLevel of batteryLevels) {
              const combination = `${location}-${batteryLevel}-${benefit}`;
              if (!usedCombinations.has(combination)) {
                usedCombinations.add(combination);
                this.scenarios.push({
                  location,
                  batteryLevel,
                  benefit,
                });
                if (this.scenarios.length >= 48) break;
              }
            }
            if (this.scenarios.length >= 48) break;
          }
          if (this.scenarios.length >= 48) break;
        }
      }
      // 将 this.scenarios 每三个为一组
      const groupedScenarios = [];
      for (let i = 0; i < this.scenarios.length; i += 3) {
        groupedScenarios.push(this.scenarios.slice(i, i + 3));
      }
      // groupedScenarios原本顺序是1-16，打乱顺序为[1,5,9,13,2,6,10,14,3,7,11,15,4,8,12,16]
      let rearrangedScenarios = [];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          rearrangedScenarios.push(groupedScenarios[i + j * 4]);
        }
      }
      // 将打乱顺序后的组重新展开为一个数组
      this.scenarios = rearrangedScenarios.flat();
    },
    handleNextGroup() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.saveCurrentForm();
          this.saveGroupData();
          if (this.currentGroup < 15) {
            this.currentGroup++;
            this.restoreForm();
            if (this.currentGroup === 5 || this.currentGroup === 11) {
              this.attentionReminderVisible = true;
            }
          }
        } else {
          this.$message.error("请完成所有题目");
        }
        console.log("表单结果:", this.allData);
      });
    },
    handlePreviousGroup() {
      if (this.currentGroup > 0) {
        this.saveCurrentForm();
        this.currentGroup--;
        this.restoreForm();
      }
    },
    handleAttentionReminder() {
      if (this.attentionReminder) {
        this.attentionReminderVisible = false;
        this.attentionReminder = false;
      }
    },
    saveCurrentForm() {
      this.savedForms[this.currentGroup] = JSON.parse(
        JSON.stringify(this.form)
      );
    },
    restoreForm() {
      if (this.savedForms[this.currentGroup]) {
        this.form = JSON.parse(
          JSON.stringify(this.savedForms[this.currentGroup])
        );
      } else {
        this.$refs.form.resetFields(); // 重置表单字段，清除校验的红色字
      }
    },
    saveGroupData() {
      for (let i = 0; i < 3; i++) {
        const index = this.currentGroup * 3 + i;
        if (this.scenarios[index]) {
          const data = {
            location: this.scenarios[index].location,
            batteryLevel: this.scenarios[index].batteryLevel,
            benefit: this.scenarios[index].benefit,
            option: this.form.choices[index],
            dischargeLevels: this.form.dischargeLevels[index],
            noJionReason: this.form.reasons[index],
          };
          this.allData.push(data);
        }
      }
    },
    getImage(location) {
      switch (location) {
        case "停放在家里":
          return require("@/assets/images/home.png");
        case "停放在公司":
          return require("@/assets/images/office.png");
        case "停放在商场":
          return require("@/assets/images/market.png");
        case "需要应急供电，且就在附近":
          return require("@/assets/images/emergency.png");
        default:
          return "";
      }
    },
    formatTooltip(val) {
      return `${val}%`;
    },
    handleSliderChange(index) {
      if (100 - this.form.dischargeLevels[index] < 20) {
        this.$message.error("剩余电量需要大于20%");
        this.form.dischargeLevels[index] = 80; // 将放电程度设置为最大允许值
      }
    },
    handleChoiceChange(index) {
      if (this.form.choices[index] === "不参与V2G") {
        this.form.reasons[index] = ""; // 清空理由
      } else {
        this.form.reasons[index] = ""; // 清空理由
      }
      if (
        this.form.choices[index] === "不参与V2G" ||
        this.form.choices[index] === ""
      ) {
        this.form.dischargeLevels[index] = 0;
      }
    },
    handleComplete() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.saveCurrentForm();
          this.saveGroupData();
          console.log("表单结果:", this.allData);
          // 提交所有数据并跳转到下一页
          this.$router.push({ name: "BatteryInvestmentPage" });
        } else {
          this.$message.error("请完成所有题目");
        }
      });
    },
  },
};
</script>

<style scoped>
.content-box {
  text-align: left;
}

.scenario-group {
  margin-bottom: 20px;
}

.scenario-content {
  display: flex;
  h2 {
    margin-right: 40px;
    line-height: 20px;
  }
}
.image-wrapper {
  width: 100%;
  text-align: center;
}
.location-image {
  width: 340px;
  height: 140px;
}

.scenario-text {
  flex: 1;
}

h1,
h2 {
  color: #3498db; /* 浅蓝色 */
}

strong {
  font-size: 1.2em;
  color: #000;
}

.attention-reminder {
  color: red; /* 红色 */
}

.attention-dialog .el-dialog__header {
  text-align: center;
  color: red;
}

.attention-checkbox {
  display: flex;
  justify-content: center;
}

.remaining-battery {
  color: red;
}
/* 自定义 el-slider 样式 */
::v-deep .el-slider__bar {
  background-color: #66cc66; /* 绿色滑块 */
}

::v-deep .el-slider__button {
  border-color: green; /* 绿色边框 */
}
</style>