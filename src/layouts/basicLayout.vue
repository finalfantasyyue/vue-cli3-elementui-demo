<template>
  <div class="basic-layout" :class="classObj">
    <div class="side-menu-wrapper">
      <side-menu-layout></side-menu-layout>
    </div>
    <div class="content-wrapper">
      <div class="header-wrapper">
        <header-layout></header-layout>
      </div>
      <div class="main-wrapper">
        <!-- <content-layout></content-layout> -->
        <router-view></router-view>
      </div>
      <div class="footer-wrapper">
        <footer-layout></footer-layout>
      </div>
    </div>
    <div class="progress-indicator" :style="{'width': scrollWidth}"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import headerLayout from "./header";
import footerLayout from "./footer";
import sideMenuLayout from "./sidebar";
export default {
  name: "basicLayout",
  components: {
    headerLayout,
    footerLayout,
    sideMenuLayout
  },
  data() {
    return {
      scrollWidth: ''
    };
  },
  computed: {
    ...mapGetters([
      'language',
      'sidebar'
    ]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop  // 滚动高度
      let documentHeight = document.documentElement.scrollHeight // 整个文档高度
      let bodyHeight = document.documentElement.clientHeight // 可视区域高度
      this.scrollWidth = Math.floor((scrollTop / (documentHeight - bodyHeight)) * 100) + '%'
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.basic-layout {
  height: 100%;
  .progress-indicator {
    position: fixed;
    left: 0;
    top: 0;
    height: 3px;
    background: #0a74da;
    z-index: 100;
  }
  .side-menu-wrapper {
    position: fixed;
    left: 0;
    top: 0px;
    width: 200px;
    height: 100%;
    border-right: 1px solid #ddd;
    background-color: #304156;
  }
  .content-wrapper {
    position: relative;
    top: 0px;
    margin-left: 200px;
    height: 100%;
    .header-wrapper {
      position: relative;
      top: 0;
      height: 60px;
      line-height: 60px;
      width: 100%;
      z-index: 100;
      background: #fff;
      border-bottom: 1px solid #ddd;
    }
    .main-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .footer-wrapper {
      /*position: absolute;*/
      height: 60px;
      width: 100%;
      bottom: 0;
    }
  }
}
</style>


