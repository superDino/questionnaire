<template>
    <div class="page-wrapper">
      <div class="content-box">
        <h1>V2G（车网互动）意愿调查问卷</h1>
        <el-form :model="form" :rules="rules" ref="form" label-width="200px" label-position="left" @submit.prevent="handleSubmit">
          <el-form-item label="您的微信号：" required prop="wechatId">
            <el-input v-model="form.wechatId"></el-input>
          </el-form-item>
          <el-form-item label="您的年龄：" required prop="age">
            <el-radio-group v-model="form.age">
              <el-radio label="20-30">20-30</el-radio>
              <el-radio label="30-40">30-40</el-radio>
              <el-radio label="40-50">40-50</el-radio>
              <el-radio label="50+">50+</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="您的性别：" required prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
              <el-radio label="preferNotToSay">不愿透露</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="教育背景：" required prop="education">
            <el-radio-group v-model="form.education">
              <el-radio label="highSchoolOrBelow">高中及以下</el-radio>
              <el-radio label="associateDegree">专科</el-radio>
              <el-radio label="bachelorDegree">本科</el-radio>
              <el-radio label="masterDegree">硕士研究生</el-radio>
              <el-radio label="doctorateDegree">博士研究生</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="您的平均年收入(税前)：" required prop="income">
            <el-radio-group v-model="form.income">
              <el-radio label="student">学生无收入</el-radio>
              <el-radio label="below200k">20万以下</el-radio>
              <el-radio label="200k-300k">20-30万</el-radio>
              <el-radio label="300k-400k">30-40万</el-radio>
              <el-radio label="400k-500k">40-50万</el-radio>
              <el-radio label="above500k">50万以上</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="您拥有的车型：" required prop="carType">
            <el-radio-group v-model="form.carType">
              <el-radio label="pureEV">纯电动汽车</el-radio>
              <el-radio label="plugInHybrid">插电式混合动力汽车</el-radio>
              <el-radio label="rangeExtendedEV">增程式电汽车</el-radio>
              <el-radio label="fuelCellEV">燃料电池汽车</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="您拥有汽车的电池容量大小：" required prop="batteryCapacity">
            <el-radio-group v-model="form.batteryCapacity">
              <el-radio label="below10kWh">10kWh以下</el-radio>
              <el-radio label="10-20kWh">10-20 kWh</el-radio>
              <el-radio label="20-30kWh">20-30 kWh</el-radio>
              <el-radio label="30-40kWh">30-40 kWh</el-radio>
              <el-radio label="40-50kWh">40-50 kWh</el-radio>
              <el-radio label="50-60kWh">50-60 kWh</el-radio>
              <el-radio label="60-70kWh">60-70 kWh</el-radio>
              <el-radio label="above70kWh">70kWh以上</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="您的驾驶年限（驾驶经历，并非获得驾照的时间）：" required prop="drivingExperience">
            <el-radio-group v-model="form.drivingExperience">
              <el-radio label="below3Years">小于3年</el-radio>
              <el-radio label="3-5Years">3-5年</el-radio>
              <el-radio label="5-7Years">5-7年</el-radio>
              <el-radio label="7-10Years">7-10年</el-radio>
              <el-radio label="above10Years">10年以上</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="一周使用车的频率：" required prop="usageFrequency">
            <el-radio-group v-model="form.usageFrequency">
              <el-radio label="daily">每天</el-radio>
              <el-radio label="1-3TimesPerWeek">一周1-3次</el-radio>
              <el-radio label="4-6TimesPerWeek">一周4-6次</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="您平均日常的出行距离：" required prop="dailyDistance">
            <el-radio-group v-model="form.dailyDistance">
              <el-radio label="below20km">20km以内</el-radio>
              <el-radio label="20-50km">20-50km</el-radio>
              <el-radio label="50-80km">50-80km</el-radio>
              <el-radio label="80-100km">80-100km</el-radio>
              <el-radio label="above100km">100km以上</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="您周中的平均出行距离：" required prop="weekdayDistance">
            <el-radio-group v-model="form.weekdayDistance">
              <el-radio label="below20km">20km以内</el-radio>
              <el-radio label="20-50km">20-50km</el-radio>
              <el-radio label="50-80km">50-80km</el-radio>
              <el-radio label="80-100km">80-100km</el-radio>
              <el-radio label="above100km">100km以上</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="您周末的平均出行距离：" required prop="weekendDistance">
            <el-radio-group v-model="form.weekendDistance">
              <el-radio label="below20km">20km以内</el-radio>
              <el-radio label="20-50km">20-50km</el-radio>
              <el-radio label="50-80km">50-80km</el-radio>
              <el-radio label="80-100km">80-100km</el-radio>
              <el-radio label="above100km">100km以上</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="您现在拥有的汽车已经多少年：" required prop="carAge">
            <el-radio-group v-model="form.carAge">
              <el-radio label="below1Year">1年以内</el-radio>
              <el-radio label="1-5Years">1-5年</el-radio>
              <el-radio label="5-10Years">5-10年</el-radio>
              <el-radio label="above10Years">10年以上</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="您计划换车的时间：" required prop="planToChangeCar">
            <el-radio-group v-model="form.planToChangeCar">
              <el-radio label="within1Year">一年内</el-radio>
              <el-radio label="2-3Years">2-3年后</el-radio>
              <el-radio label="3-5Years">3-5年后</el-radio>
              <el-radio label="above5Years">5年后</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="您换车的原因：" required prop="reasonToChangeCar">
            <el-radio-group v-model="form.reasonToChangeCar">
              <el-radio label="oldCar">车老了</el-radio>
              <el-radio label="oldBattery">电池老了</el-radio>
              <el-radio label="newCar">看上新车了</el-radio>
              <el-radio label="moreMoney">又有钱了</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="btn-container">
            <el-button type="primary" @click="handleSubmit">下一步</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          wechatId: '',
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
          reasonToChangeCar: ''
        },
        rules: {
          wechatId: [{ required: true, message: '请输入您的微信号', trigger: 'blur' }],
          age: [{ required: true, message: '请选择您的年龄', trigger: 'change' }],
          gender: [{ required: true, message: '请选择您的性别', trigger: 'change' }],
          education: [{ required: true, message: '请选择您的教育背景', trigger: 'change' }],
          income: [{ required: true, message: '请选择您的平均年收入', trigger: 'change' }],
          carType: [{ required: true, message: '请选择您拥有的车型', trigger: 'change' }],
          batteryCapacity: [{ required: true, message: '请选择电池容量大小', trigger: 'change' }],
          drivingExperience: [{ required: true, message: '请选择驾驶年限', trigger: 'change' }],
          usageFrequency: [{ required: true, message: '请选择一周使用车的频率', trigger: 'change' }],
          dailyDistance: [{ required: true, message: '请选择日常出行距离', trigger: 'change' }],
          weekdayDistance: [{ required: true, message: '请选择周中出行距离', trigger: 'change' }],
          weekendDistance: [{ required: true, message: '请选择周末出行距离', trigger: 'change' }],
          carAge: [{ required: true, message: '请选择您现在拥有的汽车已经多少年', trigger: 'change' }],
          planToChangeCar: [{ required: true, message: '请选择您计划换车的时间', trigger: 'change' }],
          reasonToChangeCar: [{ required: true, message: '请选择您换车的原因', trigger: 'change' }]
        }
      };
    },
    methods: {
      handleSubmit() {
        // this.$refs.form.validate((valid) => {
        //   if (valid) {
        //     console.log('表单提交:', this.form);
        //     this.$router.push({ name: "FifthPage" });
        //   } else {
        //     console.log('表单验证失败');
        //     return false;
        //   }
        // });
        console.log("表单提交:", this.form);
        this.$router.push({ name: "FifthPage" });
      }
    }
  };
  </script>
  
  <style scoped>
    h1 {
        color: #3498db;
    }
  </style>