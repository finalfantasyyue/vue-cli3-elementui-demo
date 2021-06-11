<template>
  <div class="document-index">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column width="100" label="选择">
        <template v-slot="scope">
          <el-radio
            v-model="radio"
            :label="scope.row.id"
            @click.native.prevent="handleSelect(scope.row.id)"
          >&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <h2>实现v-model</h2>
    <z-model :value="inputValue" @input="inputValue = $event"></z-model>
    <p>{{inputValue}}</p>
    <h2>model</h2>
    <z-model :checked="checked" @change="checked = $event"></z-model>
    {{checked}}
    <h2>vue2和vue3生命周期区别</h2>
    <el-table :data="vue2Diff3" style="width: 500px;">
      <el-table-column prop="vue2" label="vue2"></el-table-column>
      <el-table-column prop="vue3" label="vue3"></el-table-column>
    </el-table>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ dropName }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="yes">可编辑</el-dropdown-item>
        <el-dropdown-item command="no">不可编辑</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <hot-table
      :data="handsontable"
      contextMenu="true"
      :colHeaders="header"
      :rowHeaders="true"
      :language="language"
      manualColumnResize="true"
      manualRowResize="true"
      :headerTooltips="true"
      :read-only="readOnly"
      width="600"
      height="300"
    ></hot-table>
    <el-button id="save" @click="save">保存</el-button>
  </div>
</template>
<script>
import { HotTable } from "@handsontable/vue";
import zModel from "./zmodel.vue";
import "handsontable/languages/zh-CN";
export default {
  name: "documents",
  components: {
    HotTable,
    zModel
  },
  watch: {
    radio(newV, oldV) {
      window.console.log(newV);
      window.console.log(oldV);
    }
  },
  data() {
    return {
      checked: false,
      inputValue: "",
      radio: 1,
      language: "zh-CN",
      dropName: "可编辑",
      readOnly: false, // 表格是否可编辑
      header: ["标题一", "标题二", "标题三", "标题四", "标题五"],
      handsontable: [
        ["", "Tesla", "Volvo", "Toyota", "Ford"],
        ["2019", 10, 11, 12, 13],
        ["2020", 20, 11, 14, 13],
        ["2021", 30, 15, 12, 13]
      ],
      vue2Diff3: [
        {
          vue2: "beforeCreate",
          vue3: "setup(替代)"
        },
        {
          vue2: "created",
          vue3: "setup(替代)"
        },
        {
          vue2: "beforeMount",
          vue3: "onBeforeMount"
        },
        {
          vue2: "mounted",
          vue3: "onMounted"
        },
        {
          vue2: "beforeUpdate",
          vue3: "onBeforeUpdate"
        },
        {
          vue2: "updated",
          vue3: "onUpdated"
        },
        {
          vue2: "beforeDestroy",
          vue3: "onBeforeUnmount"
        },
        {
          vue2: "destroyed",
          vue3: "onUnmounted"
        },
        {
          vue2: "errorCaptured",
          vue3: "onErrorCaptured"
        }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          id: 1,
          radio: false
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          id: 2,
          radio: false
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          id: 3,
          radio: false
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          id: 4,
          radio: false
        }
      ]
    };
  },
  created() {},
  methods: {
    handleCommand(command) {
      command === "yes"
        ? ((this.readOnly = false), (this.dropName = "可编辑"))
        : ((this.readOnly = true), (this.dropName = "不可编辑"));
    },
    handleSelect(row) {
      if (row === this.radio) {
        this.radio = "";
      } else {
        this.radio = row;
      }
    },
    save() {
      window.console.log(this.handsontable);
      this.$toast("弹窗内容", 4000);
    }
  }
};
</script>
<style lang='scss' rel='stylesheet' scoped>
@import "~handsontable/dist/handsontable.full.css";
h2 {
  margin-top: 20px;
}
</style>
<style lang="scss">
// #hot-display-license-info {
//   display: none;
// }
</style>


