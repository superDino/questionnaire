<template>
  <div class="page-wrapper">
    <div class="content-box">
      <el-button type="primary" @click="drawer = true">查看V2G介绍</el-button>
      <h1>对V2G的认识调查</h1>
      <el-drawer
        title="V2G介绍"
        v-model="drawer"
        direction="btt"
        size="90%"
        @close="handleCloseDrawer"
      >
        <div class="page-wrapper">
          <div class="content-box">
            <!-- <div v-if="group === 'detailed'"> -->
              <p>
                V2G（Vehicle-to-Grid），即车网互动，是指电动汽车与电网之间的双向能量交换技术。它不仅允许电动车从电网充电，而且还能让电动车在不驾驶时将电能反馈给电网。这一过程为电网提供了调节能力，帮助平衡供需，特别是在高峰时段或可再生能源供电不稳定的情况下。从能量的角度看，每辆车平均电量大于65千瓦时，则3亿辆车载储能容量超过200亿千瓦时，与中国目前每天消费总电量基本相当。从碳减排的角度看，在火电比例约束的情况下，到2050年，与无序充电场景相比，V2G可以减少27%的二氧化碳排放量，年均减碳量可达7亿吨。（中国科学院院士，清华大学车辆与运载学院教授
                欧阳明高，2022）具体来说，V2G技术能显著提高可再生能源的利用率，减少化石燃料发电的依赖，从而减少温室气体排放和空气污染。通过优化电网的能源组合，V2G有助于实现更清洁、更可持续的能源生态系统。此外，V2G还能提高电网的灵活性和稳定性，促进能源的高效利用。
              </p>
              <p>
                对于电动车主而言，V2G不仅可以减少他们的充电成本，通过在电价较低时充电，并在电价高时卖电，还能为他们带来额外收入。在丹麦，V2G技术已被广泛应用。丹麦的一项试点项目显示，参与V2G的电动汽车车主每年可获得约1300欧元的收入。（丹麦科技大学，2019）
              </p>
            <!-- </div> -->
            <!-- <div v-else>
              <p>
                V2G即车网互动，是指电动汽车与电网之间的双向能量交换技术。这项技术不仅允许电动汽车从电网充电，还能将车载电池中的电能反馈回电网。既能减轻了电网负担，也为车主带来了经济收益。
              </p>
            </div> -->
            <div class="img-container">
              <img :src="v2gImageSrc" alt="V2G示意图" />
            </div>
          </div>
        </div>
      </el-drawer>
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
          label="有助于我国“碳中和碳达峰”计划的成功实施"
          required
          prop="planSuccess"
        >
          <el-radio-group v-model="form.planSuccess">
            <el-radio :value="5">非常同意</el-radio>
            <el-radio :value="4">同意</el-radio>
            <el-radio :value="3">中立</el-radio>
            <el-radio :value="2">不同意</el-radio>
            <el-radio :value="1">非常不同意</el-radio>
            <el-radio :value="0">我不清楚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="可降低电力储存压力和运营成本"
          required
          prop="reduceStorageCost"
        >
          <el-radio-group v-model="form.reduceStorageCost">
            <el-radio :value="5">非常同意</el-radio>
            <el-radio :value="4">同意</el-radio>
            <el-radio :value="3">中立</el-radio>
            <el-radio :value="2">不同意</el-radio>
            <el-radio :value="1">非常不同意</el-radio>
            <el-radio :value="0">我不清楚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="可吸收或抵消可再生能源的波动"
          required
          prop="absorbFluctuations"
        >
          <el-radio-group v-model="form.absorbFluctuations">
            <el-radio :value="5">非常同意</el-radio>
            <el-radio :value="4">同意</el-radio>
            <el-radio :value="3">中立</el-radio>
            <el-radio :value="2">不同意</el-radio>
            <el-radio :value="1">非常不同意</el-radio>
            <el-radio :value="0">我不清楚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="可支持电力储存的分散化"
          required
          prop="supportDecentralization"
        >
          <el-radio-group v-model="form.supportDecentralization">
            <el-radio :value="5">非常同意</el-radio>
            <el-radio :value="4">同意</el-radio>
            <el-radio :value="3">中立</el-radio>
            <el-radio :value="2">不同意</el-radio>
            <el-radio :value="1">非常不同意</el-radio>
            <el-radio :value="0">我不清楚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="可增加电动汽车使用的可再生能源比例"
          required
          prop="increaseRenewableUsage"
        >
          <el-radio-group v-model="form.increaseRenewableUsage">
            <el-radio :value="5">非常同意</el-radio>
            <el-radio :value="4">同意</el-radio>
            <el-radio :value="3">中立</el-radio>
            <el-radio :value="2">不同意</el-radio>
            <el-radio :value="1">非常不同意</el-radio>
            <el-radio :value="0">我不清楚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="可以通过低价充电和高价放电获得收入"
          required
          prop="incomeFromV2G"
        >
          <el-radio-group v-model="form.incomeFromV2G">
            <el-radio :value="5">非常同意</el-radio>
            <el-radio :value="4">同意</el-radio>
            <el-radio :value="3">中立</el-radio>
            <el-radio :value="2">不同意</el-radio>
            <el-radio :value="1">非常不同意</el-radio>
            <el-radio :value="0">我不清楚</el-radio>
          </el-radio-group >
        </el-form-item>
        <el-form-item
          label="可以当做应急电源来缓解紧急情况"
          required
          prop="emergencyPower"
        >
          <el-radio-group v-model="form.emergencyPower">
            <el-radio :value="5">非常同意</el-radio>
            <el-radio :value="4">同意</el-radio>
            <el-radio :value="3">中立</el-radio>
            <el-radio :value="2">不同意</el-radio>
            <el-radio :value="1">非常不同意</el-radio>
            <el-radio :value="0">我不清楚</el-radio>
          </el-radio-group>
        </el-form-item>

        <h3>通过刚刚对V2G（车网互动）的了解，您对V2G（车网互动）的担忧</h3>
        <el-form-item
          label="如果参与V2G，我会感到出行自由受到限制"
          required
          prop="concernFreedom"
        >
          <el-radio-group v-model="form.concernFreedom">
            <el-radio :value="5">非常同意</el-radio>
            <el-radio :value="4">同意</el-radio>
            <el-radio :value="3">中立</el-radio>
            <el-radio :value="2">不同意</el-radio>
            <el-radio :value="1">非常不同意</el-radio>
            <el-radio :value="0">我不清楚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="如果参与V2G，当我想开始旅行时，我会担心电池电量不足"
          required
          prop="concernBattery"
        >
          <el-radio-group v-model="form.concernBattery">
            <el-radio :value="5">非常同意</el-radio>
            <el-radio :value="4">同意</el-radio>
            <el-radio :value="3">中立</el-radio>
            <el-radio :value="2">不同意</el-radio>
            <el-radio :value="1">非常不同意</el-radio>
            <el-radio :value="0">我不清楚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="如果参与V2G，我会担心频繁充放电会缩短电池寿命，不得不提前购买新电池"
          required
          prop="concernBatteryLife"
        >
          <el-radio-group v-model="form.concernBatteryLife">
            <el-radio :value="5">非常同意</el-radio>
            <el-radio :value="4">同意</el-radio>
            <el-radio :value="3">中立</el-radio>
            <el-radio :value="2">不同意</el-radio>
            <el-radio :value="1">非常不同意</el-radio>
            <el-radio :value="0">我不清楚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="如果参与V2G，我担心我的车辆信息会泄露"
          required
          prop="concernDataPrivacy"
        >
          <el-radio-group v-model="form.concernDataPrivacy">
            <el-radio :value="5">非常同意</el-radio>
            <el-radio :value="4">同意</el-radio>
            <el-radio :value="3">中立</el-radio>
            <el-radio :value="2">不同意</el-radio>
            <el-radio :value="1">非常不同意</el-radio>
            <el-radio :value="0">我不清楚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="增加V2G功能后，会让我的驾驶或者对车辆的操作变得复杂"
          required
          prop="concernComplexity"
        >
          <el-radio-group v-model="form.concernComplexity">
            <el-radio :value="5">非常同意</el-radio>
            <el-radio :value="4">同意</el-radio>
            <el-radio :value="3">中立</el-radio>
            <el-radio :value="2">不同意</el-radio>
            <el-radio :value="1">非常不同意</el-radio>
            <el-radio :value="0">我不清楚</el-radio>
          </el-radio-group>
        </el-form-item>
        <h3>
          通过刚刚对V2G（车网互动）的了解，请您为以下激励措施按喜爱程度排序
        </h3>
        <div class="sort-box"></div>
        <draggable v-model="form.incentiveOptions" group="items" @change="changeSort">
          <div v-for="item,index in form.incentiveOptions" :key="item" class="incentive-item">
            <div class="incentive-item-label">{{index + 1}}.   {{ item }}</div> 
            <el-icon><Grid /></el-icon>
          </div>
        </draggable>
        <div class="btn-wrapper">
          <el-button type="primary" @click="handleSubmit" :loading="this.loading"
          :disabled="this.loading">下一步</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { VueDraggableNext } from "vue-draggable-next";
export default {
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      drawer: false,
      loading: false,
      group: "",
      form: {
        planSuccess: "",
        reduceStorageCost: "",
        absorbFluctuations: "",
        supportDecentralization: "",
        increaseRenewableUsage: "",
        incomeFromV2G: "",
        emergencyPower: "",
        concernFreedom: "",
        concernBattery: "",
        concernBatteryLife: "",
        concernDataPrivacy: "",
        concernComplexity: "",
        incentiveOptions: [
        "可以直接通过放电来获得收益",
        "可获得信用积分，例如芝麻信用",
        "购买电动汽车可享受折扣",
        "电动汽车充电时比普通充电便宜，可以享受充电折扣",
        "在道路交通方面享有特殊权利，例如免费使用公共停车场",
        ],
        uuid: localStorage.getItem("uuid"),
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
        supportDecentralization: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        increaseRenewableUsage: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        incomeFromV2G: [
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
        concernDataPrivacy: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
        concernComplexity: [
          { required: true, message: "请选择您的意见", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.assignGroup();
  },
  computed: {
    v2gImageSrc() {
      return require("@/assets/images/v2gExplain.png");
    },
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log("表单提交:", this.form);
          try {
            this.loading = true;
            const response = await api.saveBasicInfo(this.form);
            console.log(response);
            if (response.status === 200) {
              this.loading = false;
              this.$router.push({ name: "GreenBehaviorPage" });
            } else {
              this.loading = false;
              this.$message.error(response.message);
            }
          } catch (error) {
            console.error(error);
            this.loading = false;
            this.$message.error("提交失败，请稍后重试");
          }
        } else {
          console.log("表单验证失败");
          return false;
        }
      });
    },
    assignGroup() {
      // 随机分配用户到对照组或详细讲解组
      this.group = Math.random() < 0.5 ? "detailed" : "brief";
    },
    handleCloseDrawer() {
      this.drawer = false;
      this.assignGroup();
    },
    changeSort() {
      console.log(this.incentiveOptions);
    },
  },
};
</script>

<style scoped>
h1,
h2 {
  color: #3498db;
}

strong {
  font-size: 1.2em;
  color: #000;
}

.el-button {
  font-size: 18px;
  padding: 10px 20px;
  margin-top: 20px;
}
.img-container {
  text-align: center;
}
img {
  width: 80%;
  height: auto;
  margin: 10px auto;
}
.sort-box{
  margin:auto;
}
.incentive-item{
  cursor: pointer;
  justify-content: space-between;
  display: flex;
  width: 500px;
  margin: 10px auto;
  padding: 10px;
  background-color:#409EFF;
  color: #fff;
  align-items: center;
}
.incentive-item-label{
  margin-left: 20px;
}
</style>