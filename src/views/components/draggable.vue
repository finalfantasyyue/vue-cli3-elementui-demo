<template>
  <div class="content">
    <el-row :gutter="20" justify="center" class="draggable-con">
      <el-col :span="12">
        <h3 class="draggable-header">Draggable 1</h3>
        <draggable class="list-group" :list="list1" :options="{animation: 150}" group="people" @change="log" @start='start' @end='end'>
          <div
            class="list-group-item"
            v-for="(element) in list1"
            :key="element.name"
          >{{ element.name }}</div>
        </draggable>
      </el-col>

      <el-col :span="12">
        <h3 class='draggable-header'>Draggable 2</h3>
        <draggable class="list-group" :list="list2" group="people" @change="log">
          <div
            class="list-group-item"
            v-for="(element) in list2"
            :key="element.name"
          >{{ element.name }}</div>
        </draggable>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "contentLayout",
  components: {
    draggable
  },
  data() {
    return {
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ]
    };
  },
  methods: {
    // add: function() {
    //   this.list.push({ name: "Juan" });
    // },
    // replace: function() {
    //   this.list = [{ name: "Edgard" }];
    // },
    // clone: function(el) {
    //   return {
    //     name: el.name + " cloned"
    //   };
    // },
    log (evt) {
      window.console.log(evt);
    },
    start (ev) {
      window.console.log(ev)
    },
    end (ev) {
      window.console.log(ev)
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.content {
  .draggable-con {
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
}
</style>

