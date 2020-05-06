<template>
  <div class="nav-wrapper">
    <el-dropdown @command="handleCommand" trigger="click">
      <div class="nav-lang">
        <span class="el-dropdown-link el-dropdown-language">{{lang}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for='item in languages'
            :key='item.value'
            :command='item.value'
          >{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </div>
</el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'headerNav',
  data () {
    return {
      lang: '中文',
      languages: [
        { value: 'zh', label: '中文' },
        { value: 'en', label: 'English' }
      ]
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleCommand (lang) {
      lang === 'zh' ? (this.lang = '中文') : (this.lang = 'English')
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .nav-wrapper {
    .nav-lang {
      transition: all .2s;
      &:hover {
        color: #409eff;
      }
      .el-dropdown-language {
      cursor: pointer;
    }
    }
  }
</style>
