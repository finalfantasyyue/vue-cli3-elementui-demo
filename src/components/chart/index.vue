<template>
  <div ref="chart"></div>
</template>
<script>
import echarts from 'echarts'
import { addListener, removeListener } from 'resize-detector'
import { debounce } from 'lodash'
  export default {
    name: 'chart',
    props: {
      option: {
        type: Object,
        default: () => {}
      }
    },
    watch: {
      // option(val) {
      //   this.myChart.setOption(val)
      // }
      option: {
        deep: true,
        handler(val) {
          this.myChart.setOption(val)
        }
      }
    },
    data() {
      return {
      }
    },
    created() {
      this.resize = debounce(this.resize, 300)
    },
    mounted() {
      this.myChart = echarts.init(this.$refs.chart);
      addListener(this.$refs.chart, this.resize)
        // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(this.option);
    },
    methods: {
      resize() {
        window.console.log('resize')
        this.myChart.resize()
      }
    },
    beforeDestroy() {
      removeListener(this.$refs.chart, this.resize)
      this.myChart.dispose()
      this.myChart = null
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>