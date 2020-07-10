<template>
  <div class="test">ceshi
  <div class="row" id="pdfDoms" style="padding-top: 55px;background-color:#fff;">
      <div>dfsafdsfdsafdsfdsfdsafdsa</div>
  </div>
  <button type="button" class="btn btn-primary" @click="print">打印</button>
  <button type="button" class="btn btn-primary" @click="getPdf()">导出PDF</button>
  </div>
</template>
<script>
export default {
  name: 'test',
  data () {
    return {
      htmlTitle: '页面导出PDF文件名'
    }
  },
  methods: {
    print() {
      window.print()
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>

</style>


