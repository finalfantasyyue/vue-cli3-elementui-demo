<template>
  <div class="dashboard">
    <!-- <div ref="chart" style="height: 400px;"></div> -->
    <chart :option="option" style="height:400px;" v-my-directive></chart>
  </div>
</template>
<script>
import { random } from "lodash";
import chart from "@/components/chart";
export default {
  name: "Main",
  components: {
    chart
  },
  data() {
    return {
      msg: "aa",
      option: {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            z: 1,
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  },
  beforeCreate() {},
  created() {
    this.$myMethod();
  },
  mounted() {
    this.interval = setInterval(() => {
      this.option.series[0].data = this.option.series[0].data.map(() =>
        random(100)
      );
      // this.option = { ...this.option }
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
</style>


