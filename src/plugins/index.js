const myPlugin = {}

myPlugin.install = function(Vue) {
  // 全局方法
  Vue.myGlobalMethod = function() {
    window.console.log('全局方法')
  }
  // 注入组件
  Vue.mixin({
    created() {
      // window.console.log('created')
    }
  })

  // 指令
  Vue.directive('my-directive', {
    bind(el, binding) {
      window.console.log(el)
      window.console.log(binding)
    }
  })

  // 实例方法
  Vue.prototype.$myMethod = function() {
    window.console.log('实例方法')
  }
}

export default myPlugin