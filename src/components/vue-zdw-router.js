export default class vueRouter {
  constructor({routes}) {
    this.routes = routes
    this.path = window.location.hash
    this.history = new History()
    this.history.listen((path) => {
      this.path = path
      this.vm.$forceUpdate()
    })
  }
  init(vm) {
    this.vm = vm
  }
}
class History {
  listen(callback) {
    window.addEventListener('hashchange', () => {
      callback && callback(window.location.hash)
    })
  }
}
vueRouter.install = function(Vue) {
  Vue.mixin({
    beforeCreate() {
      // 根组件，含有router属性
      if (this.$options.router) {
        this.$options.router.init(this)
      }
    }
  })
  Vue.component('router-view', {
    functional: true,
    return (createElement, { props, parent, children, data }) {
      const router = parent.$options.router
      const path = router.path
      const matchedRoute = router.routes.find(route => {
        return route.replace(/^#\//, '') === path.replace(/^\//, '')
      })
      const component = matchedRoute.component
      return createElement(
        component
      )
    }
  })
}