<template>
  <div class="container">
    <div class="box">
      <div class="column" id="c1">
      </div>
      <div class="column" id="c2">
      </div>
      <div class="column" id="c3"></div>
    </div>
    <div class="line"></div>
    <div class="buttons" @click="move($event)">
      <div class="button">
        <div class="left" from="c1" to="c3">左</div>
        <div class="right" from="c1" to="c2">右</div>
      </div>
      <div class="button">
        <div class="left" from="c2" to="c1">左</div>
        <div class="right" from="c2" to="c3">右</div>
      </div>
      <div class="button">
        <div class="left" from="c3" to="c2">左</div>
        <div class="right" from="c3" to="c1">右</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'hannuo',
    data() {
      return {
        obj: {
          width: 60,
          constant: 40,
          c1: [5, 4, 3, 2, 1],
          c2: [],
          c3: []
        },
        isOver: false
      }
    },
    mounted() {
      this.render()
    },
    methods: {
      renderCircle(cno) {
        let column = document.getElementById(cno)
        column.innerHTML = ''
        let len = this.obj[cno].length
        for (let i = 0; i < len; i++) {
          let v = this.obj[cno][i]
          let div = document.createElement('div')
          div.style.cssText += ';height: 20px; background: red; border-radius: 10px;'
          div.style.width = this.obj.width + (v - 1) * this.obj.constant + 'px'
          column.appendChild(div)
        }
      },
      render() {
        this.renderCircle('c1')
        this.renderCircle('c2')
        this.renderCircle('c3')
        if (this.isOver) {
          this.$message.success('恭喜')
        }
      },
      move(e) {
        const from = e.target.getAttribute('from')
        const to = e.target.getAttribute('to')
        let btn = e.target.className
        if (btn === 'buttons' || btn === 'button') return
        this._move(from, to)
      },
      _move(from, to) {
        this.isOver = false
        if (this.obj[from].length === 0) {
          return
        }
        let fromVal = this.obj[from], toVal = this.obj[to];

        if (this.obj[to].length === 0) {
          toVal.push(fromVal.pop())
          // 判断游戏是否结束
          toVal.length === 3 ? this.isOver = true : this.isOver = false
        } else if (fromVal[fromVal.length - 1] < toVal[toVal.length - 1]) {
          toVal.push(fromVal.pop())
          toVal.length === 3 ? this.isOver = true : this.isOver = false
        } else {
          this.$message.warning('操作错误')
          return
        }
        this.render(from, to)
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .container {
    min-width: 800px;
    height: 500px;

    .box {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 70%;
      margin-top: 50px;

      .column {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        background: rgba(221, 221, 221, 0.47);
        width: 25px;
        height: 100%;
        padding: 20px 0px 0px;
        border-radius: 10px 10px 0 0;
        box-sizing: border-box;

        .circle {
          width: 50px;
          height: 20px;
          background: red;
          border-radius: 10px;
        }
      }
    }

    .line {
      height: 20px;
      width: 100%;
      background: #5a5a5a;
    }

    .buttons {
      display: flex;
      justify-content: space-around;

      .button {
        display: flex;
        justify-content: space-around;
        width: 100px;
        margin: 20px 0;

        div {
          color: #fff;
          padding: 5px;
          background: #ddd;
          border-radius: 3px;
          cursor: pointer;
          box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2)
        }
      }
    }
  }
</style>


