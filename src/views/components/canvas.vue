<template>
  <div class="ball-move">
    <canvas id="canvas" width="300" height="300"></canvas>
    <canvas id="canvas2" width="150" height="150"></canvas>
  </div>
</template>
<script>
export default {
  name: 'ballMove',
  data() {
    return {

    }
  },
  mounted() {
    this.init()
    this.draw()
  },
  methods: {
    draw() {
       /** @type {HTMLCanvasElement} */ 
      let canvas = document.querySelector('#canvas2');
      let ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FD0';
      ctx.fillRect(0,0,75,75);
      ctx.fillStyle = '#6C0';
      ctx.fillRect(75,0,75,75);
      ctx.fillStyle = '#09F';
      ctx.fillRect(0,75,75,75);
      ctx.fillStyle = '#F30';
      ctx.fillRect(75,75,75,75);
      ctx.fillStyle = '#FFF';
      ctx.globalAlpha = 0.2
      for (let i = 0; i < 7; i++) {
        ctx.beginPath()
        ctx.arc(75, 75, 10 + 10*i, 0, Math.PI*2)
        ctx.fill()
      }
    },
    init() {
      /** @type {HTMLCanvasElement} */ 
      let canvas = document.querySelector('#canvas')
      let ctx = canvas.getContext('2d');
      let running = false
      let raf = null;
      let ball = {
        x: 100,
        y: 100,
        vx: 5,
        vy: 3,
        radius: 25,
        color: 'skyblue',
        draw () {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true)
          ctx.closePath()
          ctx.fillStyle = this.color
          ctx.fill()
        }
      }
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ball.draw()
        ball.x += ball.vx
        ball.y += ball.vy
        // ball.vy *= .99;
        ball.vy += .25; // 加速度
        // 边界判断
        if (ball.x + ball.vx > canvas.width - 50 || ball.x+ball.vx < 0) {
          ball.vx = -ball.vx
        }
        if (ball.y + ball.vy > canvas.height - 50 || ball.y+ball.vy < 0) {
          ball.vy = -ball.vy
        }
        raf = window.requestAnimationFrame(draw)
      }
      // canvas.addEventListener('mouseover', () => {
      //   raf = window.requestAnimationFrame(draw)
      // })
      
      canvas.addEventListener('mousemove', (e) => {
        if (!running) {
          ctx.fillStyle = 'rgba(255,255,255,0.3)';
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ball.x = e.offsetX
          ball.y = e.offsetY
          ball.draw()
        }
      })
      canvas.addEventListener('click', () => {
        if (!running) {
          raf = window.requestAnimationFrame(draw)
          running = true
        }
      })
      canvas.addEventListener('mouseout', () => {
        window.cancelAnimationFrame(raf)
        running = false
      })
      return ball.draw()
    }
  }
}
</script>
<style lang="scss" scoped>
  .ball-move {
    height: 900px;
  }
  #canvas {
    position: absolute;
    margin: 20px auto;
    left: 0;
    right: 0;
    border: 1px solid #ddd;
  }
  #canvas2 {
    margin: 20px;
    border: 1px solid #ddd;
  }
</style>