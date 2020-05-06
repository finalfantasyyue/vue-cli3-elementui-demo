<template>
  <div class="side-item">
    <template v-if="route.children && !route.noSubMenu">
        <el-submenu :index="route.path">
          <template slot="title" >
            <i :class='route.meta.icon'></i>
            <span slot='title'>{{generateTitle(route.meta.title)}}</span>
          </template>
          <side-item
            v-for='(item, index) in route.children'
            :key='index'
            :route='item'
          ></side-item>
        </el-submenu>
    </template>
    <template v-else>
      <template v-if='!route.hidden'>
        <router-link :to="{ name: route.name }">
          <el-menu-item :index="route.path" class='menu-item' :class="{'submenu-title-noDropdown':!isNest}">
            <i :class='route.meta.icon'></i>
            <span slot="title">{{generateTitle(route.meta.title)}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </template>
  </div>
</template>
<script>
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { generateTitle } from '@/utils/i18n'
export default {
  name: 'sideItem',
  props: {
    route: {
      type: Object,
      default: () => {}
    },
    isNest: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {}
  },
  beforeCreate() {
    nprogress.start()
  },
  mounted() {
    nprogress.done()
  },
  computed: {
  },
  methods: {
    generateTitle
  }
}
</script>
<style lang='scss' rel='stylesheet' scoped>

</style>


