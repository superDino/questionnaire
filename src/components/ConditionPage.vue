<template>
  <div class="page-wrapper">
    <div class="content-box">
      <h1>为了实验准确性和可靠性，参与者需满足以下两个条件：</h1>
      <el-form :model="form" label-width="10px" label-position="left">
        <el-form-item>
          <el-checkbox v-model="form.hasLicense">您拥有驾照</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.hasEV"
            >您拥有新能源汽车（包含纯电动汽车，插电式混合动力汽车，增程式电汽车和燃料电池汽车）</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <div class="btn-container">
            <el-button type="primary" size="large" @click="checkEligibility">
              下一步
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <div v-if="!isEligible" class="ineligible-message">
        <p>
          很抱歉，您未能满足参与此次调查的条件。如果您对新能源汽车、V2G以及充电桩相关内容感兴趣可以下次再参加我们实验，感谢您的参与。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        hasLicense: false,
        hasEV: false,
      },
      isEligible: true,
    };
  },
  methods: {
    checkEligibility() {
      this.isEligible = this.form.hasLicense && this.form.hasEV;
      if (this.isEligible) {
        this.$router.push({ name: "ConsentFormPage" });
      }
    },
  },
};
</script>

<style scoped>

h1 {
  margin-bottom: 20px;
  color: #3498db; /* 浅蓝色 */
}

.ineligible-message {
  margin-top: 20px;
  color: red;
}
</style>