<template>
  <div class="sidebar-wrapper">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.name"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        mode="vertical"
        ref="menu"
      >
        <side-item
          v-for='(item, index) in accessRoutes'
          :key='index'
          :route='item'
        ></side-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { asyncRoutes } from '@/router'
import { mapGetters } from 'vuex'
import sideItem from '@/layouts/sideItem'
export default {
  name: 'sidebar',
  components: {
    sideItem
  },
  data () {
    return{
      accessRoutes: [],
      openeds: []
    }
  },
  created () {
    this.accessRoutes = asyncRoutes
    this.openeds.push(this.$route.fullPath.split('/')[1])
  },
  computed: {
    ...mapGetters([
      'language',
      'sidebar'
    ]),
    lang: {
      get() {
        return this.$store.state.app.language
      },
      set(lang) {
        this.$i18n.locale = lang
        this.$store.dispatch('app/setLanguage', lang)
      }
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
      this.openeds.forEach((item) => {
        this.$refs.menu.open(item)
      })
    },
    handleOpen (key, keyPath) {
      const index = this.openeds.indexOf(key)
      if (!index) {
        this.openeds.push(key)
      }
    },
    handleClose (key, keyPath) {
      window.console.log(key, keyPath)
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  
</style>

