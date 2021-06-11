<template>
  <div class="toast" v-show="show">
    {{text}}
  </div>
</template>
<script>
export default {
  name: 'toast',
  data() {
    return {
      text: 'hello',
      show: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .toast {
    position: fixed;
    left: calc(50% - 40px);
    top: calc(50% - 20px);
    width: 80px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    text-align: center;
    background: #303133;
    color: #fff;
  }
</style>