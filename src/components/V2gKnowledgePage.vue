<template>
  <div class="page-wrapper">
    <div class="content-box">
      <h1>对V2G的认识调查</h1>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="300px"
        label-position="left"
        @submit.prevent="handleSubmit"
      >
        <h3>通过刚刚对V2G（车网互动）的了解，您认为V2G（车网互动）</h3>
        <el-form-item
          label="有助于“6030”计划的成功实施"
          required
          prop="planSuccess"
        >
          <el-radio-group v-model="form.planSuccess">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="可降低未来必要的电力储存成本"
          required
          prop="reduceStorageCost"
        >
          <el-radio-group v-model="form.reduceStorageCost">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="可吸收或抵消可再生能源的波动"
          required
          prop="absorbFluctuations"
        >
          <el-radio-group v-model="form.absorbFluctuations">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="可使补偿需求波动的备用发电厂过时"
          required
          prop="outdatedBackupPlants"
        >
          <el-radio-group v-model="form.outdatedBackupPlants">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="可以通过低价充电和高价放电获得收入"
          required
          prop="incomeFromV2G"
        >
          <el-radio-group v-model="form.incomeFromV2G">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="可支持电力储存的分散化"
          required
          prop="supportDecentralization"
        >
          <el-radio-group v-model="form.supportDecentralization">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="可增加电动汽车使用的可再生能源比例"
          required
          prop="increaseRenewableUsage"
        >
          <el-radio-group v-model="form.increaseRenewableUsage">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="有助于避免电网扩张"
          required
          prop="avoidGridExpansion"
        >
          <el-radio-group v-model="form.avoidGridExpansion">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="可为自家提供应急电源"
          required
          prop="emergencyPower"
        >
          <el-radio-group v-model="form.emergencyPower">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>

        <h3>通过刚刚对V2G（车网互动）的了解，您对V2G（车网互动）的担忧</h3>
        <el-form-item
          label="如果采用双向充电，我会感到自由和独立受到限制"
          required
          prop="concernFreedom"
        >
          <el-radio-group v-model="form.concernFreedom">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="如果采用双向充电，当我想开始旅行时，我会担心电池电量不足"
          required
          prop="concernBattery"
        >
          <el-radio-group v-model="form.concernBattery">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="如果采用双向充电，我会担心频繁充放电会缩短电池寿命，不得不提前购买新电池"
          required
          prop="concernBatteryLife"
        >
          <el-radio-group v-model="form.concernBatteryLife">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="我的出行计划还不足以让我放弃使用 V2G 车辆"
          required
          prop="concernTravelPlans"
        >
          <el-radio-group v-model="form.concernTravelPlans">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="如果采用双向充电，我担心我的数据会被用来创建运动曲线"
          required
          prop="concernDataPrivacy"
        >
          <el-radio-group v-model="form.concernDataPrivacy">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="向车载电脑输入充放电数据会让我的驾驶变得过于复杂"
          required
          prop="concernComplexity"
        >
          <el-radio-group v-model="form.concernComplexity">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="如果采用双向充电，我将无法控制我的电动汽车"
          required
          prop="concernControl"
        >
          <el-radio-group v-model="form.concernControl">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>

        <h3>通过刚刚对V2G（车网互动）的了解，您更喜欢参与的激励措施</h3>
        <el-form-item
          label="我将获得年度奖金"
          required
          prop="preferAnnualBonus"
        >
          <el-radio-group v-model="form.preferAnnualBonus">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="购买电动汽车可享受折扣"
          required
          prop="preferCarDiscount"
        >
          <el-radio-group v-model="form.preferCarDiscount">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="购买电动汽车充电站可享受折扣"
          required
          prop="preferChargingStationDiscount"
        >
          <el-radio-group v-model="form.preferChargingStationDiscount">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="为我的电动汽车充电比普通充电便宜"
          required
          prop="preferCheaperCharging"
        >
          <el-radio-group v-model="form.preferCheaperCharging">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="可以直接通过放电来获得收益"
          required
          prop="preferIncomeFromDischarge"
        >
          <el-radio-group v-model="form.preferIncomeFromDischarge">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="我在道路交通方面享有特殊权利，例如免费使用公交车道或公共停车场"
          required
          prop="preferSpecialRights"
        >
          <el-radio-group v-model="form.preferSpecialRights">
            <el-radio label="5">非常同意</el-radio>
            <el-radio label="4">同意</el-radio>
            <el-radio label="3">中立</el-radio>
            <el-radio label="2">不同意</el-radio>
            <el-radio label="1">非常不同意</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="btn-wrapper">
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
        planSuccess: "",
        reduceStorageCost: "",
        absorbFluctuations: "",
        outdatedBackupPlants: "",
        incomeFromV2G: "",
        supportDecentralization: "",
        increaseRenewableUsage: "",
        avoidGridExpansion: "",
        emergencyPower: "",
        concernFreedom: "",
        concernBattery: "",
        concernBatteryLife: "",
        concernTravelPlans: "",
        concernDataPrivacy: "",
        concernComplexity: "",
        concernControl: "",
        preferAnnualBonus: "",
        preferCarDiscount: "",
        preferChargingStationDiscount: "",
        preferCheaperCharging: "",
        preferIncomeFromDischarge: "",
        preferSpecialRights: "",
      },
      rules: {
        planSuccess: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        reduceStorageCost: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        absorbFluctuations: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        outdatedBackupPlants: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        incomeFromV2G: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        supportDecentralization: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        increaseRenewableUsage: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        avoidGridExpansion: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        emergencyPower: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        concernFreedom: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        concernBattery: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        concernBatteryLife: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        concernTravelPlans: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        concernDataPrivacy: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        concernComplexity: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        concernControl: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        preferAnnualBonus: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        preferCarDiscount: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        preferChargingStationDiscount: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        preferCheaperCharging: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        preferIncomeFromDischarge: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        preferSpecialRights: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            console.log("表单提交:", this.form);
            this.$router.push({ name: "GreenBehaviorPage" });
          } else {
            console.log("表单验证失败");
            return false;
          }
        });
      // console.log("表单提交:", this.form);
      // this.$router.push({ name: "GreenBehaviorPage" });
    },
  },
};
</script>
  
  <style scoped>
h1,
h3 {
  color: #3498db;
}
h3 {
  text-align: left;
}
</style>