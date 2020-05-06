<template>
  <div class="container" @click="stop">
    <span class="num"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'effects',
    data() {
      return {
        colors: ['#ffd12b', '#00ff43', '#ffeb00', '#d465c7', '#ca4118'],
        timer: null,
        count: 0, // 暂停/开始
        num: 0
      }
    },
    created() {
      this.nums()
    },
    methods: {
      // 质数
      isPrime(num) {
        if (num < 2) return false
        if (num === 2) return true
        if (num % 2 === 0) return false
        for (let i = 3; i < num; i += 2) {
          if (num % i === 0) {
            return false
          }
        }
        return true
      },
      // 颜色索引
      randomNum(max, min) {
        return Math.floor(Math.random()*(max - min) + min) + 'px'
      },
      createdSpan(color) {
        let span = document.createElement('span')
        span.innerHTML = this.num
        span.style.cssText = `;display: inline-block; color: ${color}; text-shadow: 0 0 2px ${color}; font-size: 50px; position: absolute; top: 48%; left: 48%; transition: all .5s linear;transform: scale(1.5)`
        document.querySelector('.container').appendChild(span)
        // getComputedStyle让浏览器重新渲染
        getComputedStyle(span).width
        // 然后执行translate，否则不生效
        span.style.transform = `translate(${this.randomNum(-100, 100)},${this.randomNum(-100, 100)})`
        span.addEventListener('transitionend', function() {
          span.remove()
        })
      },
      nums() {
        this.timer = setInterval(() => {
          let div = document.createElement('div')
          div.style.cssText = ';display: inline-block; margin-right: 10px; font-size: 18px;'
          div.innerHTML = this.num
          if (this.isPrime(this.num)) {
            const index = Math.floor(Math.random() * this.colors.length)
            const color = this.colors[index]
            div.style.color = color
            div.style.textShadow = '0 0 2px'+ color
            document.querySelector('.num').innerHTML = this.num
            // 在创建一个原色
            this.createdSpan(color)
          }
          document.querySelector('.container').appendChild(div)
          this.num++
        }, 500)
      },
      // 开始/暂停
      stop() {
        if (this.count % 2 === 0) {
          clearInterval(this.timer)
        } else {
          this.nums()
        }
        this.count ++
      }
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .container {
   height: 500px;
 }
  .num {
    position: absolute;
    left: 48%;
    top: 48%;
    font-size: 50px;
  }
</style>