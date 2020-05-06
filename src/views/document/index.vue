<template>
  <div class="document-index">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        width="100"
        label='选择'
      >
        <template v-slot="scope">
          <el-radio v-model="radio" :label="scope.row.id" @click.native.prevent='handleSelect(scope.row.id)'>&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column type="index" label='序号' width='100'>
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'documents',
  watch: {
    radio(newV, oldV) {
      window.console.log(newV)
      window.console.log(oldV)
    }
  },
  data () {
    return {
      radio: 1,
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            id: 1,
            radio: false
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            id: 2,
            radio: false
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            id: 3,
            radio: false
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            id: 4,
            radio: false
          }]
    }
  },
  methods: {
    handleSelect(row) {
      if (row === this.radio) {
        this.radio = ''
      } else {
        this.radio = row
      }
    }
  }
}
</script>
<style lang='scss' rel='stylesheet' scoped>

</style>


