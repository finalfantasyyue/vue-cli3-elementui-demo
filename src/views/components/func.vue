<template>
  <div class="func-gather">
    <div class="letter">
      <span class="title">出现次数最多的字母:</span>
      {{statisticalLetter}}
    </div>
    <div class="time">{{time2}}</div>
  </div>
</template>
<script>
  export default {
    name: 'func',
    data() {
      return {
        letter: 'aababbabaabccddbfderrssbssrrbaads',
        time: ['00:00-00:15', '00:15-00:30', '00:30-00:45', '00:45-01:00', '01:00-01:15'],
        time2: [],
        time3: []
      }
    },
    created() {
      window.console.log(this.fibonacci(4))
      this.clockTime()
    },
    computed: {
      statisticalLetter() { // 出现次数最多的字母
        /*const obj = {}
        let maxCount = 0, maxString = '', len = this.letter.length;
        for (let i = 0; i < len; i++) {
          const key = this.letter[i];
          if (obj[key]) {
            obj[key]++
          } else {
            obj[key] = 1
          }
        }

        for (let key in obj) {
          if (maxCount < obj[key]) {
            maxCount = obj[key]
            maxString = key
          } else if (maxCount === obj[key]) {
            maxString = `${maxString}、 ${key}`
          }
        }
        return maxString+"出现了:"+maxCount+"次";*/
        let maxStr = '', maxCount = 0;
        let arr = [...new Set(this.letter)]
        for (let i = 0; i < arr.length; i++) {
          let reg = new RegExp(arr[i], 'g')
          let len = this.letter.match(reg).length
          if (maxCount < len) {
            maxCount = len
            maxStr = arr[i]
          } else if (maxCount === len) {
            maxStr = `${maxStr}、${arr[i]}`
          }
        }
        return maxStr + '出现了:' + maxCount + '次'
      }
    },
    methods: {
      // 斐波那契数列
      fibonacci(count) {
        if (count === 0 || count === 1) return 1
        if (count >= 2) {
          return this.fibonacci(count - 1) + this.fibonacci(count - 2)
        }
      },
      // time
      clockTime() {
        let h = 0;
        for (let i = 0; i < 96; i++) {
          if (i % 4 === 0 && i >= 4) {
            ++h
          }
          if (i % 4 === 0) {
            h < 10 ? this.time2.push(`0${h}:00-0${h}:15`) : this.time2.push(`${h}:00-${h}:15`)
          } else if (i % 4 === 1) {
            h < 10 ? this.time2.push(`0${h}:15-0${h}:30`) : this.time2.push(`${h}:15-${h}:30`)
          } else if (i % 4 === 2) {
            h < 10 ? this.time2.push(`0${h}:30-0${h}:45`) : this.time2.push(`${h}:30-${h}:45`)
          } else if (i % 4 === 3) {
            if (h < 10) {
              if (h + 1 === 10) {
                this.time2.push(`0${h}:45-${h + 1}:00`)
              } else {
                this.time2.push(`0${h}:45-0${h + 1}:00`)
              }
            } else {
              if (h + 1 === 24) {
                this.time2.push(`${h}:45-00:00`)
              } else {
                this.time2.push(`${h}:45-${h + 1}:00`)
              }
            }
          }
        }
      },
      clock() {
        // ['00:00-00:15', '00:15-00:30', '00:30-00:45', '00:45-01:00',
        //  '01:00-01:15']
        let time = 0
        for (let i = 0; i < 96; i++) {

        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet" scoped>
  .func-gather {
    margin: 20px;

    .letter {
      margin: 10px;
    }
  }
</style>


