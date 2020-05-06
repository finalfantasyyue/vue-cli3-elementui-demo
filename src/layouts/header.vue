<template>
  <div class="header">
    <i class="el-icon-s-fold" :class="{'is-active': isActive}" @click='toggleSideBar'></i>
    <a href="#" class="home-link">Vue-test</a>
    <div class="links">
      <header-nav></header-nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import headerNav from "@/components/nav";
export default {
  name: "headerLayout",
  components: {
    headerNav
  },
  data() {
    return {
      isCollapse: true
    };
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isActive () {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.header {
  display: flex;
  vertical-align: middle;
  align-items: center;
  height: 100%;
  .is-active {
    transform: rotate(180deg);
  }
  .el-icon-s-fold {
    font-size: 20px;
    margin-left: 15px;
    cursor: pointer;
  }
  .home-link {
    display: inline-block;
    padding: 0 20px;
    font-size: 16px;
    color: #000;
  }
  .links {
    position: absolute;
    right: 50px;
    top: 0;
  }
}
</style>

