import vue from 'vue'
import toast from './toast.vue'

const toastConstructor = vue.extend(toast)

function showToast(text, duration = 2000) {
  const instance = new toastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        text: text,
        show: true
      }
    }
  })
  window.console.log(instance)

  document.body.appendChild(instance.$el)

  setTimeout(() => {
    instance.show = false
  }, duration)
}

function toastRegistry() {
  vue.prototype.$toast = showToast
}

export default toastRegistry