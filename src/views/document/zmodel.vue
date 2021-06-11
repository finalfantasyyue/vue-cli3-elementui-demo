<template>
  <div>
    <input type="text" :value="value" @input="handleInput" />
    <input type="checkbox" :checked="checked" @change="handleChange" />
  </div>
</template>
<script>
export default {
  name: "vmodel",
  props: ["value", "checked"],
  model: {
    prop: "checked",
    event: "change"
  },
  data() {
    return {};
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    handleChange(e) {
      this.$emit("change", e.target.checked);
    }
  }
};
</script>
<style lang="scss">
</style>