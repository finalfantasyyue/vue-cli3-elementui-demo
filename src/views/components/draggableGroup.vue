<template>
  <div class="draggable-group">
    <div class="form-row-group-left">
      <h2 class='left-title'>组内属性</h2>
      <el-button type="primary" class="add-group" @click="addGroup">add</el-button>
      <el-button type="primary" class="add-group" @click="deleteGroup">delete</el-button>
      <el-row>
        <el-col :span='12'>
          <div class="form-row-group-folder" v-if="saveGroupSuccess">
            <li v-for="(item, index) in groups" :key="index" ref="groupList" class="group-folder-list">
              <i :class="item.iconFolder"></i>
              <span v-if='!modifyGroupName || modifyGroupFlag !== index' @click='selectGroup(index)' class='span-list'>{{ item.name }}</span>
              <el-input 
              v-if='modifyGroupName && modifyGroupFlag === index'
              v-model='groups[index].name' 
              class='group-name'
              ref='modifyGroupNameInupt'
              @blur='saveGroupName' 
              @keyup.enter.native='saveGroupName'
              ></el-input>
              <i :class="item.iconEdit" @click='handleModifyGroupName(index)'></i>
              <draggable 
                class="list-group" 
                :list="item.tasks" 
                v-bind="{group: 'people', animation: 150, ghostClass:'sortable-ghost', scrollSensitivity: 30}" 
                @change="log"
                @end="end"
                >
                <div
                  class="list-group-item"
                  v-for="(element) in item.tasks"
                  :key="element.name"
                >{{ element.name }}</div>
              </draggable>
            </li>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="form-row-addGroup" v-if="showGroupInput">
            <el-input v-model="groupName" placeholder="请输入分组名称" class="form-input" ref='addGroupInput'></el-input>
            <i class="el-icon-check" @click="saveGroup"></i>
            <span class="group-warning" v-if='nullGroupName'>请输入分组名称</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="form-row-group-right">
      <h2 class='right-title'>非组内属性</h2>
      <draggable 
        class="list-group" 
        :list="list"
        v-bind="{group: 'people', animation: 150}"
        @change="log"
        @end="end"
        >
          <div
            class="list-group-item"
            v-for="(element) in list"
            :key="element.name"
          >{{ element.name }}</div>
        </draggable>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
// import nestedDraggable from "@/views/components/infra/nested";
export default {
  name: "draggbaleGroup",
  components: {
    // nestedDraggable,
    draggable,
  },
  data() {
    return {
      nullGroupName: false, // 分组名称为空
      saveGroupSuccess: false, // 保存分组
      showGroupInput: false, // 添加分组 input
      modifyGroupName: false,
      modifyGroupFlag: '', // 修改数据索引
      groups: [],
      groupName: '',
      list: [
        { name: "task 1" },
        { name: "task 2" },
        { name: "task 3" },
        { name: "task 4" },
        { name: "task 5" },
        { name: "task 6" }
      ]
    };
  },
  methods: {
    log (ev) {
      window.console.log(ev)
    },
    end () {
      window.console.log(this.groups)
    },
    selectGroup (index) {
      this.$refs.groupList.forEach((val) => {
        val.getElementsByClassName('span-list')[0].classList.remove('active-group-list')
      })
      this.$refs.groupList[index].getElementsByClassName('span-list')[0].classList.add('active-group-list')
    },
    // 修改组名
    handleModifyGroupName (index) {
      this.modifyGroupFlag = index
      this.modifyGroupName = true
      this.$nextTick(() => {
        this.$refs.modifyGroupNameInupt[0].focus()
      })
    },
    saveGroupName () {
      this.modifyGroupName = false;
    },
    // 新增组
    addGroup() {
      this.groupName = '';
      this.showGroupInput = true;
      // 自动获取焦点
      this.$nextTick(() => {
        this.$refs.addGroupInput.focus()
      })
    },
    // 删除组
    deleteGroup () {
      if (!this.$refs.groupList) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '请先添加组'
        })
        return false
      }
      this.$refs.groupList.forEach((val,index) => {
        const hasSelect = val.getElementsByClassName('span-list')[0].classList.contains('active-group-list')
        if (hasSelect) {
          const task = this.groups[index].tasks.length
          if (!task) {
            this.$message({
                type: 'success',
                message: '删除成功!'
              });
            this.groups.splice(index,1)
          } else {
            this.$confirm('该组包含组内属性，请移除组内属性再试','提示',{
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'warning'
            }).then(() => {
              return;
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
          }
        }
      })
    },
    saveGroup() {
      if (this.groupName !== "") {
        this.groups.push({
          name: this.groupName,
          iconFolder: 'el-icon-folder',
          iconEdit: 'el-icon-edit',
          tasks: []
        });
        this.showGroupInput = false;
        this.saveGroupSuccess = true;
        this.nullGroupName = false;
      } else {
        this.nullGroupName = true;
      }
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.draggable-group {
  margin: 20px;
  .form-row-group-right, .form-row-group-left{
    float: left;
    width: 49%;
    .right-title,.left-ttile {
      border-bottom: 1px solid #a5a5a5;
    }
    .list-group {
      margin-top: 10px;
      .list-group-item {
        margin: 10px 0;
        color: #5a5a5a;
        cursor: pointer;
      }
    }
  }
  .form-row-group-folder {
    margin: 20px 0;
    .group-folder-list {
      margin: 10px 0;
      .el-icon-edit {
        cursor: pointer;
      }
      .group-name {
        width: 100px;
        margin: 0 10px;
      }
      span {
        cursor: pointer;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
    .active-group-list {
      background: #ddd;
    }
  }
  .form-row-addGroup {
    position: relative;
    display: flex;
    align-items: center;
    margin: 20px 0;
    .form-input {
      width: 80%;
    }
    .group-warning {
      position: absolute;
      bottom: -20px;
      left: 5px;
      font-size: 12px;
      color: rgb(245, 108, 108);
    }
    .el-icon-check {
      font-size: 16px;
      font-weight: bold;
      padding: 3px;
      margin-left: 6px;
      color: #00968a;
      border: 2px solid #00968a;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>


