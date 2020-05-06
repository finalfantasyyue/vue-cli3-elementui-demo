<template>
<div>
  <el-row :gutter="20" justify="center" class="draggable-con">
      <el-col :span="24">
        <draggable class="dragArea" tag="ul" :list="tasks" group="people">
        <li v-for="el in tasks" :key="el.name">
          <p>{{ el.name }}</p>
          <nested-draggable :tasks="el.tasks" />
        </li>
      </draggable>
      </el-col>
        <!-- <el-col :span="12">
          <draggable class="list-group" :list="list2" group="people">
            <div
              class="list-group-item"
              v-for="(element) in list2"
              :key="element.name"
            >{{ element.name }}</div>
          </draggable>
        </el-col> -->
      </el-row>
    </el-row>
    </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  props: {
    tasks: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  },
  name: "nested-draggable",
  data () {
    return {
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ]
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
.draggable-con {
    // float: left;
    width: 50%;
    margin: 0 !important;
    .draggable-header {
      height: 50px;
      line-height: 50px;
      overflow: hidden;
      padding: 0 20px;
      text-align: center;
      background: #4a9ff9;
      color: #fff;
      border-radius: 3px 3px 0 0;
    }
    .list-group-item {
      cursor: pointer;
      width: 100%;
      height: 64px;
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      padding: 5px 10px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
    }
  }
</style>