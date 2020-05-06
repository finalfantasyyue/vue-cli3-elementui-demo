import router from './router'
// import store from './store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    nprogress.start()
  }
  next()
})
router.afterEach(() => {
  nprogress.done()
})
