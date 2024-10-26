<template>
    <div class="page-wrapper">
      <div class="content-box">
        <el-form :model="form" :rules="rules" ref="form" label-position="left">
          <div v-if="isAttentionReminderGroup" class="attention-reminder">
            <h2>注意力提醒</h2>
            <p>这个是注意力提醒，请您认真阅读题目进行作答，每个场景都有不同的限制条件，细微差别请注意辨别，如果感到疲惫可以休息一下眼睛：）</p>
            <el-checkbox v-model="attentionReminder">好的，收到提醒</el-checkbox>
          </div>
          <div v-else>
            <div class="scenario-group">
              <div class="image-wrapper"><img :src="getImage(currentGroupScenarios[0].location)" alt="location image" class="location-image" /></div>
              <div v-for="(scenario, index) in currentGroupScenarios" :key="index" class="scenario-content">
                <h2>问题 {{ currentGroup * 3 + index + 1 }}</h2>
                <div class="scenario-text">
                  <p>如果你的车现在<strong>{{ scenario.location }}</strong>，剩余电量在<strong>{{ scenario.batteryLevel }}</strong>之间，且有可以参与V2G的条件。</p>
                  <p>在此场景，您的选择是:</p>
                  <el-form-item :prop="'choices.' + (currentGroup * 3 + index)" :rules="[{ required: true, message: '请对此场景做出您的选择', trigger: 'change' }]">
                    <el-radio-group v-model="form.choices[currentGroup * 3 + index]" @change="handleChoiceChange(currentGroup * 3 + index)">
                      <el-radio :label="'参与V2G，' + scenario.benefit">参与V2G，<strong>{{ scenario.benefit }}</strong></el-radio>
                      <el-radio :label="'参与V2G，没有任何收益，但会显示可以减15g碳'">参与V2G，没有任何收益，但会显示可以减15g碳（不是最后真的碳量，只是一个提示的作用）</el-radio>
                      <el-radio :label="'不参与V2G'">不参与V2G</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item v-if="form.choices[currentGroup * 3 + index] === '参与V2G，没有任何收益，但会显示可以减15g碳'" :prop="'dischargeLevels.' + (currentGroup * 3 + index)" :rules="[{ required: true, message: '请选择可接受的最大放电程度', trigger: 'change' }]">
                    <p>可接受的最大放电程度（为了保护电池，最低剩余电量为20%）</p>
                    <el-slider
                      v-model="form.dischargeLevels[currentGroup * 3 + index]"
                      :min="0"
                      :max="100"
                      :step="1"
                      show-input
                      :format-tooltip="formatTooltip"
                      @change="handleSliderChange(currentGroup * 3 + index)"
                    ></el-slider>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
          <div class="btn-container">
            <el-button v-if="currentGroup > 0" @click="handlePreviousGroup">上一页</el-button>
            <el-button
              v-if="(!isAttentionReminderGroup || attentionReminder) && currentGroup < 15"
              type="primary"
              @click="handleNextGroup"
            >
              下一页
            </el-button>
            <el-button v-if="currentGroup === 15" @click="handleComplete" type="primary">完成</el-button>
          </div>
        </el-form>
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
        },
        rules: {
          choices: [{ required: true, message: '请对此场景做出您的选择', trigger: 'change' }],
          dischargeLevels: [{ required: true, message: '请选择可接受的最大放电程度', trigger: 'change' }]
        },
        currentGroup: 0,
        attentionReminder: false,
        savedForms: [],
        allData: []
      };
    },
    computed: {
      currentGroupScenarios() {
        return this.scenarios.slice(this.currentGroup * 3, this.currentGroup * 3 + 3);
      },
      isAttentionReminderGroup() {
        return this.currentGroup === 5 || this.currentGroup === 11;
      }
    },
    created() {
      this.generateScenarios();
    },
    methods: {
      generateScenarios() {
        const locations = ["停放在家里", "停放在公司", "停放在商场", "处于紧急情况"];
        const batteryLevels = ["100-80%", "80-50%", "50-30%"];
        const benefits = ["没有奖励", "0.5元每度", "1元每度", "1.5元每度"];
        let previousLocationIndex = -1;
  
        for (let i = 0; i < 16; i++) {
          let locationIndex;
          do {
            locationIndex = Math.floor(Math.random() * locations.length);
          } while (locationIndex === previousLocationIndex);
  
          previousLocationIndex = locationIndex;
  
          for (let j = 0; j < 3; j++) {
            const shuffledBenefits = benefits.sort(() => Math.random() - 0.5);
            this.scenarios.push({
              location: locations[locationIndex],
              batteryLevel: batteryLevels[j],
              benefit: shuffledBenefits[j % benefits.length],
            });
          }
        }
      },
      handleNextGroup() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.isAttentionReminderGroup && !this.attentionReminder) {
              this.$message.error("请勾选注意力提醒");
              return;
            }
            this.saveCurrentForm();
            this.saveGroupData();
            if (this.currentGroup < 15) {
              this.currentGroup++;
              this.attentionReminder = false;
              this.restoreForm();
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
      saveCurrentForm() {
        this.savedForms[this.currentGroup] = JSON.parse(JSON.stringify(this.form));
      },
      restoreForm() {
        if (this.savedForms[this.currentGroup]) {
          this.form = JSON.parse(JSON.stringify(this.savedForms[this.currentGroup]));
        } else {
          this.$refs.form.resetFields(); // 重置表单字段，清除校验的红色字
        }
      },
      saveGroupData() {
        for (let i = 0; i < 3; i++) {
          const index = this.currentGroup * 3 + i;
          const data = {
            location: this.scenarios[index].location,
            batteryLevel: this.scenarios[index].batteryLevel,
            benefit: this.scenarios[index].benefit,
            option: this.form.choices[index],
          };
          if (this.form.choices[index] === '参与V2G，没有任何收益，但会显示可以减15g碳') {
            data.dischargeLevels = `${this.form.dischargeLevels[index]}%`;
          }
          this.allData.push(data);
        }
      },
      getImage(location) {
        switch (location) {
          case '停放在家里':
            return require('@/assets/images/home.png');
          case '停放在公司':
            return require('@/assets/images/office.png');
          case '停放在商场':
            return require('@/assets/images/market.png');
          case '处于紧急情况':
            return require('@/assets/images/emergency.png');
          default:
            return '';
        }
      },
      formatTooltip(val) {
        return `${val}%`;
      },
      handleSliderChange(index) {
        if (this.form.dischargeLevels[index] > 20) {
          this.$message.error("不能超过20%");
          this.form.dischargeLevels[index] = 20;
        }
      },
      handleChoiceChange(index) {
        if (this.form.choices[index] !== '参与V2G，没有任何收益，但会显示可以减15g碳') {
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
      }
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
  .image-wrapper{
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
  
  h1, h2 {
    color: #3498db; /* 浅蓝色 */
  }
  
  strong {
    font-size: 1.2em;
    color: #000;
  }
  
  .attention-reminder {
    color: red; /* 红色 */
  }
  
  </style>