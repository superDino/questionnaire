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
            <p class="location-hint">
              当前场景：<strong>{{
                getLocations(currentGroupScenarios[0].location)
              }}</strong>
            </p>
          </div>
          <div
            v-for="(scenario, index) in currentGroupScenarios"
            :key="index"
            class="scenario-content"
          >
            <h2>问题 {{ currentGroup * 2 + index + 1 }}</h2>
            <div class="scenario-text">
              <p>
                如果<strong>{{ scenario.location }}</strong
                >，剩余电量在<strong>{{ scenario.batteryLevel }}</strong
                >之间，且有可以参与V2G的条件。<strong
                  >已知当前充电费用为1元/度。</strong
                >
              </p>
              <p>在此场景，您的选择是:</p>
              <el-form-item
                :prop="'choices.' + (currentGroup * 2 + index)"
                :rules="[
                  {
                    required: true,
                    message: '请对此场景做出您的选择',
                    trigger: 'change',
                  },
                ]"
              >
                <el-radio-group
                  v-model="form.choices[currentGroup * 2 + index]"
                  @change="handleChoiceChange(currentGroup * 2 + index)"
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
                    >参与此次V2G可以帮助<strong>减碳15g</strong></el-radio
                  >
                  <el-radio :value="'不参与V2G'">不参与V2G</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                v-if="
                  form.choices[currentGroup * 2 + index] !== '不参与V2G' &&
                  form.choices[currentGroup * 2 + index] !== ''
                "
                :prop="'dischargeLevels.' + (currentGroup * 2 + index)"
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
                  v-model="form.dischargeLevels[currentGroup * 2 + index]"
                  :min="0"
                  :max="100"
                  :step="10"
                  show-stops
                  show-input
                  :format-tooltip="formatTooltip"
                  @change="handleSliderChange(currentGroup * 2 + index)"
                  type="info"
                ></el-slider>
                <p class="remaining-battery">
                  剩余电量:
                  {{ 100 - form.dischargeLevels[currentGroup * 2 + index] }}%
                </p>
              </el-form-item>
              <el-form-item
                v-if="form.choices[currentGroup * 2 + index] === '不参与V2G'"
                :prop="'reasons.' + (currentGroup * 2 + index)"
                :rules="[
                  {
                    required: true,
                    message: '请填写不参与的具体原因',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-checkbox-group
                  type="textarea"
                  v-model="form.reasons[currentGroup * 2 + index]"
                >
                  <el-checkbox :value="'放电收益少'">放电收益少</el-checkbox>
                  <el-checkbox :value="'停车时间短'">停车时间短</el-checkbox>
                  <el-checkbox :value="'其他'">其他</el-checkbox>
                </el-checkbox-group>
                <el-input
                  type="textarea"
                  v-if="form.reasons[currentGroup * 2 + index].includes('其他')"
                  v-model="form.otherReason[currentGroup * 2 + index]"
                  placeholder="请填写其他原因"
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
            v-if="currentGroup < 11"
            type="primary"
            @click="handleNextGroup"
          >
            下一页
          </el-button>
          <el-button
            v-if="currentGroup === 11"
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
import api from '@/api';

export default {
  data() {
    return {
      scenarios: [],
      form: {
        choices: Array(24).fill(""),
        dischargeLevels: Array(24).fill(0),
        reasons: Array(24).fill([]),
        otherReason: Array(24).fill([]),
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
        this.currentGroup * 2,
        this.currentGroup * 2 + 2
      );
    },
    isAttentionReminderVisible() {
      return this.currentGroup === 5 || this.currentGroup === 9;
    },
  },
  created() {
    this.generateScenarios();
  },
  methods: {
    generateScenarios() {
      const locations = [
        "您的车现在停放在家或者公司",
        "您的车现在停放在商场",
        "现在需要应急供电，您的车就在附近",
      ];
      const batteryLevels = ["100%左右", "50%左右"];
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

      while (this.scenarios.length < 24) {
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
                if (this.scenarios.length >= 24) break;
              }
            }
            if (this.scenarios.length >= 24) break;
          }
          if (this.scenarios.length >= 24) break;
        }
      }
      // 将 this.scenarios 每两个为一组
      const groupedScenarios = [];
      for (let i = 0; i < this.scenarios.length; i += 2) {
        groupedScenarios.push(this.scenarios.slice(i, i + 2));
      }
      // groupedScenarios原本顺序是1-12，打乱顺序为[1,4,7,10,2,5,8,11,3,6,9,12]
      let rearrangedScenarios = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          rearrangedScenarios.push(groupedScenarios[i + j * 3]);
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
          if (this.currentGroup < 11) {
            this.currentGroup++;
            this.restoreForm();
            if (this.currentGroup === 5 || this.currentGroup === 9) {
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
      for (let i = 0; i < 2; i++) {
        const index = this.currentGroup * 2 + i;
        if (this.scenarios[index]) {
          const data = {
            location: this.scenarios[index].location,
            batteryLevel: this.scenarios[index].batteryLevel,
            benefit: this.scenarios[index].benefit,
            optionContent : this.form.choices[index],
            dischargeLevels: this.form.dischargeLevels[index],
            noJoinReason: this.form.reasons[index],
            otherNoJoinReason: this.form.otherReason[index],
            uuid: localStorage.getItem("uuid"),
          };
          this.allData.push(data);
        }
      }
    },
    getImage(location) {
      switch (location) {
        case "您的车现在停放在家或者公司":
          return require("@/assets/images/homeOrOffice.png");
        case "您的车现在停放在商场":
          return require("@/assets/images/market.png");
        case "现在需要应急供电，您的车就在附近":
          return require("@/assets/images/emergency.png");
        default:
          return "";
      }
    },
    getLocations(location) {
      switch (location) {
        case "您的车现在停放在家或者公司":
          return "家或公司";
        case "您的车现在停放在商场":
          return "商场";
        case "现在需要应急供电，您的车就在附近":
          return "应急用电";
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
      // 当batteryLevels的值是50%时，dischargeLevels的值不能大于50
      if (this.scenarios[index].batteryLevel === "50%左右") {
        if (100 - this.form.dischargeLevels[index] > 50) {
          this.form.dischargeLevels[index] = 50; // 将放电程度设置为最大允许值
        }
      }
      
    },
    handleChoiceChange(index) {
      this.form.reasons[index] = [];
      this.form.otherReason[index] = ''
      if (
        this.form.choices[index] === "不参与V2G" ||
        this.form.choices[index] === ""
      ) {
        this.form.dischargeLevels[index] = 0;
      }
      if (this.scenarios[index].batteryLevel === "100%左右") {
        this.form.dischargeLevels[index] = 0;
      } else
      if (this.scenarios[index].batteryLevel === "50%左右") {
        this.form.dischargeLevels[index] = 50;
      }
      if (this.form.choices[index] === "不参与V2G") {
        this.form.dischargeLevels[index] = 0;
      }
    },
    handleComplete() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          this.saveCurrentForm();
          this.saveGroupData();
          console.log("表单结果:", this.allData);
          // 提交所有数据并跳转到下一页
          try {
            const response = await api.saveScenariosResult(this.allData);
            console.log(response);
            if (response.status === 200) {
              this.$router.push({ name: "BatteryInvestmentPage" });
            } else {
              this.$message.error(response.message);
            }
          } catch (error) {
            console.error(error);
            this.$message.error("提交失败，请稍后重试");
          }
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
.location-hint {
  font-size: 1.5em; /* 调整字体大小 */
  font-weight: bold; /* 加粗 */
  margin-top: 10px; /* 增加与图片的间距 */
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
.el-radio-group {
  display: grid !important;
}
</style>


