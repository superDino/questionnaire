<!-- src/components/SurveyForm.vue -->
<template>
  <div class="survey-form">
    <h1>XXX调查问卷</h1>
    <el-form @submit.prevent="handleSubmit" :model="form" label-width="300px" label-position="left" :rules="rules" ref="form">
      <el-form-item label="您是否有驾照：" required>
        <el-radio-group v-model="form.hasLicense">
          <el-radio label="yes">是</el-radio>
          <el-radio label="no">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="您是否有新能源汽车：" v-if="form.hasLicense === 'yes'" required>
        <el-radio-group v-model="form.hasEV">
          <el-radio label="yes">是</el-radio>
          <el-radio label="no">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="form.hasLicense === 'yes' && form.hasEV === 'yes'">
        <div class="section-title">基本信息</div>
        <el-form-item label="您的年龄：" required prop="age">
          <el-radio-group v-model="form.age" placeholder="请选择">
            <el-radio label="20-30" value="20-30"></el-radio>
            <el-radio label="30-40" value="30-40"></el-radio>
            <el-radio label="40-50" value="40-50"></el-radio>
            <el-radio label="50+" value="50+"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="您的性别：" required prop="gender">
          <el-radio-group v-model="form.gender" placeholder="请选择">
            <el-radio label="男" value="male"></el-radio>
            <el-radio label="女" value="female"></el-radio>
            <el-radio label="不愿透露" value="preferNotToSay"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="教育程度：" required prop="education">
          <el-radio-group v-model="form.education" placeholder="请选择">
            <el-radio label="高中及以下" value="highSchoolOrBelow"></el-radio>
            <el-radio label="大学" value="university"></el-radio>
            <el-radio label="研究生" value="graduate"></el-radio>
            <el-radio label="博士" value="doctorate"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="您的平均年收入：" required prop="income">
          <el-radio-group v-model="form.income" placeholder="请选择">
            <el-radio label="学生无收入" value="student"></el-radio>
            <el-radio label="20万以下" value="below200k"></el-radio>
            <el-radio label="20-30万" value="200k-300k"></el-radio>
            <el-radio label="30-40万" value="300k-400k"></el-radio>
            <el-radio label="40-50万" value="400k-500k"></el-radio>
            <el-radio label="50万以上" value="above500k"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="您拥有的车型：" required prop="carType">
          <el-radio-group v-model="form.carType" placeholder="请选择">
            <el-radio label="纯电动汽车" value="pureEV"></el-radio>
            <el-radio label="插电式混合动力汽车" value="plugInHybrid"></el-radio>
            <el-radio label="增程式电汽车" value="rangeExtendedEV"></el-radio>
            <el-radio label="燃料电池汽车" value="fuelCellEV"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="您拥有汽车的电池容量大小：" required prop="batteryCapacity">
          <el-radio-group v-model="form.batteryCapacity" placeholder="请选择">
            <el-radio label="10kWh以下" value="below10kWh"></el-radio>
            <el-radio label="10-20 kWh" value="10-20kWh"></el-radio>
            <el-radio label="20-30 kWh" value="20-30kWh"></el-radio>
            <el-radio label="30-40 kWh" value="30-40kWh"></el-radio>
            <el-radio label="40-50 kWh" value="40-50kWh"></el-radio>
            <el-radio label="50-60 kWh" value="50-60kWh"></el-radio>
            <el-radio label="60-70 kWh" value="60-70kWh"></el-radio>
            <el-radio label="70kWh以上" value="above70kWh"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="您的驾驶年限：" required prop="drivingExperience">
          <el-radio-group v-model="form.drivingExperience" placeholder="请选择">
            <el-radio label="小于3年" value="below3Years"></el-radio>
            <el-radio label="3-5年" value="3-5Years"></el-radio>
            <el-radio label="5-7年" value="5-7Years"></el-radio>
            <el-radio label="7-10年" value="7-10Years"></el-radio>
            <el-radio label="10年以上" value="above10Years"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="一周使用车的频率：" required prop="usageFrequency">
          <el-radio-group v-model="form.usageFrequency" placeholder="请选择">
            <el-radio label="每天" value="daily"></el-radio>
            <el-radio label="一周1-3次" value="1-3TimesPerWeek"></el-radio>
            <el-radio label="一周4-6次" value="4-6TimesPerWeek"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="您平均日常的出行距离：" required prop="dailyDistance">
          <el-radio-group v-model="form.dailyDistance" placeholder="请选择">
            <el-radio label="20km以内" value="below20km"></el-radio>
            <el-radio label="20-50km" value="20-50km"></el-radio>
            <el-radio label="50-80km" value="50-80km"></el-radio>
            <el-radio label="80-100km" value="80-100km"></el-radio>
            <el-radio label="100km以上" value="above100km"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="您周中的平均出行距离：" required prop="weekdayDistance">
          <el-radio-group v-model="form.weekdayDistance" placeholder="请选择">
            <el-radio label="20km以内" value="below20km"></el-radio>
            <el-radio label="20-50km" value="20-50km"></el-radio>
            <el-radio label="50-80km" value="50-80km"></el-radio>
            <el-radio label="80-100km" value="80-100km"></el-radio>
            <el-radio label="100km以上" value="above100km"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="您周末的平均出行距离：" required prop="weekendDistance">
          <el-radio-group v-model="form.weekendDistance" placeholder="请选择">
            <el-radio label="20km以内" value="below20km"></el-radio>
            <el-radio label="20-50km" value="20-50km"></el-radio>
            <el-radio label="50-80km" value="50-80km"></el-radio>
            <el-radio label="80-100km" value="80-100km"></el-radio>
            <el-radio label="100km以上" value="above100km"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="您现在拥有的汽车已经多少年：" required prop="carAge">
          <el-radio-group v-model="form.carAge" placeholder="请选择">
            <el-radio label="1年以内" value="below1Year"></el-radio>
            <el-radio label="1-5年" value="1-5Years"></el-radio>
            <el-radio label="5-10年" value="5-10Years"></el-radio>
            <el-radio label="10年以上" value="above10Years"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="您计划换车的时间：" required prop="planToChangeCar">
          <el-radio-group v-model="form.planToChangeCar" placeholder="请选择">
            <el-radio label="一年内" value="within1Year"></el-radio>
            <el-radio label="2-3年后" value="2-3Years"></el-radio>
            <el-radio label="3-5年后" value="3-5Years"></el-radio>
            <el-radio label="5年后" value="above5Years"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="您换车的原因：" required prop="reasonToChangeCar">
          <el-radio-group v-model="form.reasonToChangeCar" placeholder="请选择">
            <el-radio label="车老了" value="oldCar"></el-radio>
            <el-radio label="电池老了" value="oldBattery"></el-radio>
            <el-radio label="看上新车了" value="newCar"></el-radio>
            <el-radio label="又有钱了" value="moreMoney"></el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="section-title">对V2G的认识</div>
        <el-form-item label="日常生活中是否会有绿色行为：" required prop="greenBehavior">
          <el-radio-group v-model="form.greenBehavior" placeholder="请选择">
            <el-radio label="不太在意" value="notConcerned"></el-radio>
            <el-radio label="会在意" value="concerned"></el-radio>
            <el-radio label="非常在意" value="veryConcerned"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="日常会做的绿色行为是："  required prop="greenActions">
          <el-checkbox-group v-model="form.greenActions" >
            <el-checkbox label="关注低碳新闻"></el-checkbox>
            <el-checkbox label="回收一次性塑料瓶"></el-checkbox>
            <el-checkbox label="垃圾分类"></el-checkbox>
            <el-checkbox label="随手关灯"></el-checkbox>
            <el-checkbox label="空调不低于26度"></el-checkbox>
            <el-checkbox label="其他"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="section-title">V2G场景</div>
        <el-form-item :label="v2gScenarioLabel" required prop="v2gParticipate">
          <el-radio-group v-model="form.v2gParticipate">
            <el-radio label="participate">参与V2G, {{ v2gBenifit }}</el-radio>
            <el-radio label="noBenefitWithCarbonReduction">参与V2G，没有任何收益，但会显示可以减多少碳</el-radio>
            <el-radio label="maxDischarge">可接受的最大放电程度（为了保护电池，最低剩余电量为20%）</el-radio>
            <el-radio label="notParticipate">不参与V2G</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="如果你现在决定购买一辆新的电动汽车，会选择以下哪个类型：" required prop="newCarChoice">
          <el-radio-group v-model="form.newCarChoice" placeholder="请选择">
            <el-radio label="和现在已有车辆类似" value="similarToCurrent"></el-radio>
            <el-radio label="电池容量大 花较多的钱 能参与V2G，有一定的收益" value="largeBatteryWithV2G"></el-radio>
            <el-radio label="电池容量大 花更多的钱 更能参与V2G 可以接受电池损耗，获得更多的收益" value="largerBatteryWithMoreV2G"></el-radio>
            <el-radio label="不知道" value="notSure"></el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="submit-button-container">
          <el-button type="primary" size="large" @click="handleSubmit">
            {{ isSubmitting ? '提交中...' : '提交' }}
          </el-button>
        </div>
      </div>
    </el-form>
    <div class="submission-result">
      <h2>提交结果</h2>
      <pre>{{ form }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      form: {
        hasLicense: 'yes',
        hasEV: 'yes',
        age: '',
        gender: '',
        education: '',
        income: '',
        carType: '',
        batteryCapacity: '',
        drivingExperience: '',
        usageFrequency: '',
        dailyDistance: '',
        weekdayDistance: '',
        weekendDistance: '',
        carAge: '',
        planToChangeCar: '',
        reasonToChangeCar: '',
        greenBehavior: '',
        greenActions: [],
        v2gParticipate:'',
        newCarChoice: ''
      },
      v2gScenarioLabel: '',
      radomLocation: ['停放在家', '停放在公司', '停放在商场', '处于紧急情况'],
      radomBatteryLevel: ['100-80%', '80-50%', '50-30%'],
      radomBenefits: ['没有任何收益', '收益为0.5元每度', '收益为1元每度', '收益为1.5元每度'],
      v2gBenifit: '',
      rules: {
        hasLicense: [{ required: true, message: '请选择是否有驾照', trigger: 'change' }],
        hasEV: [{ required: true, message: '请选择是否有新能源汽车', trigger: 'change' }],
        age: [{ required: true, message: '请选择您的年龄', trigger: 'change' }],
        gender: [{ required: true, message: '请选择您的性别', trigger: 'change' }],
        education: [{ required: true, message: '请选择您的教育程度', trigger: 'change' }],
        income: [{ required: true, message: '请选择您的平均年收入', trigger: 'change' }],
        carType: [{ required: true, message: '请选择您拥有的车型', trigger: 'change' }],
        batteryCapacity: [{ required: true, message: '请选择您拥有汽车的电池容量大小', trigger: 'change' }],
        drivingExperience: [{ required: true, message: '请选择您的驾驶年限', trigger: 'change' }],
        usageFrequency: [{ required: true, message: '请选择一周使用车的频率', trigger: 'change' }],
        dailyDistance: [{ required: true, message: '请选择您平均日常的出行距离', trigger: 'change' }],
        weekdayDistance: [{ required: true, message: '请选择您周中的平均出行距离', trigger: 'change' }],
        weekendDistance: [{ required: true, message: '请选择您周末的平均出行距离', trigger: 'change' }],
        carAge: [{ required: true, message: '请选择您现在拥有的汽车已经多少年', trigger: 'change' }],
        planToChangeCar: [{ required: true, message: '请选择您计划换车的时间', trigger: 'change' }],
        reasonToChangeCar: [{ required: true, message: '请选择您换车的原因', trigger: 'change' }],
        greenActions: [{ required: true, message: '请选择日常会做的绿色行为', trigger: 'change' }],
        greenBehavior: [{ required: true, message: '请选择日常生活中是否会有绿色行为', trigger: 'change' }],
        v2gParticipate: [{ required: true, message: '请选择参与意向', trigger: 'change' }],
        newCarChoice: [{ required: true, message: '请选择新车类型', trigger: 'change' }]
      },
      submitted: false,
      isSubmitting: false
    };
  },
  created() {
      this.v2gScenarioLabel = `如果您的车${this.radomLocation[Math.floor(Math.random() * this.radomLocation.length)]}，剩余电量为${this.radomBatteryLevel[Math.floor(Math.random() * this.radomBatteryLevel.length)]}`;
      this.v2gBenifit = this.radomBenefits[Math.floor(Math.random() * this.radomBenefits.length)];
  },
  methods: {
    async handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.isSubmitting) return;
          this.isSubmitting = true;
          try {
            const response = await axios.post('https://api.example.com/submit', this.form);
            console.log('提交成功:', response.data);
            this.submitted = true;
          } catch (error) {
            console.error('提交失败:', error);
          } finally {
            this.isSubmitting = false;
          }
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.survey-form {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.submission-result {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #e9ecef;
}
.el-form-item {
  margin-bottom: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #e8e8e8;
}
.el-form-item:last-child {
  border-bottom: none;
}
.section-title {
  text-align: left;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #3498db; /* 浅蓝色 */
  border-left: 5px solid #3498db; /* 左边的竖线 */
  padding-left: 10px; /* 竖线和文字之间的间距 */
}
h1 {
  color: #3498db; /* 浅蓝色 */
}
.submit-button-container {
  text-align: center;
  margin-top: 100px;
  width:100%;
}
.el-button {
  font-size: 18px;
  width: 300px;
  padding: 10px 20px;
}
</style>
