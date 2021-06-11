<template>
  <div class="node-interface">
    <el-form ref="form" :model="form" label-width="120px" @submit.native.prevent="submit">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "nodeInterface",
  data() {
    return {
      form: {
        name: "",
        age: ""
      }
    };
  },
  methods: {
    async submit() {
      const res = await this.$http.post("/articles", this.form);
      console.log(res);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>