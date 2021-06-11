<template>
  <div class="ball-move">
    <canvas id="canvas" width="150" height="150"></canvas>
    <canvas id="canvas2" width="150" height="150"></canvas>
    <canvas id="canvas3" width="150" height="150"></canvas>
    <canvas id="canvas4" width="150" height="150"></canvas>
    <canvas id="canvas5" width="150" height="150"></canvas>
    <canvas id="canvas6" width="150" height="150"></canvas>
    <canvas id="canvas7" width="150" height="150"></canvas>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg1">
      <circle cx="50" cy="50" r="50" stroke="block" stroke-width="2" fill="orange"></circle>
    </svg>
    <div class="canvasLineDash">
      <div class="box"></div>
    </div>
    <canvas id="canvas9" width="150" height="150"></canvas>
    <canvas id="canvas10" width="150" height="150"></canvas>
    <canvas id="canvas11" width="150" height="150"></canvas>
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
    this.drawRect()
    this.drawSmileFace()
    this.saveAndRestore()
    this.canvas6()
    this.canvas7()
    this.canvasLineDash()
    this.canvas9()
    this.canvas10()
    this.canvas11()
  },
  methods: { 
    init() {
      /** @type {HTMLCanvasElement} */ 
      let canvas = document.querySelector('#canvas')
      let ctx = canvas.getContext('2d');
      let running = false
      let raf = null;
      let ball = {
        x: 50,
        y: 50,
        vx: 5,
        vy: 3,
        radius: 12.5,
        color: 'skyblue',
        draw () {
          ctx.beginPath()
          // ctx.setLineDash([10, 3]) // 虚线边框
          // ctx.strokeRect(0,0,150,150)
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
        if (ball.x + ball.vx > canvas.width - 25 || ball.x+ball.vx < 0) {
          ball.vx = -ball.vx
        }
        if (ball.y + ball.vy > canvas.height - 25 || ball.y+ball.vy < 0) {
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
    },
    draw() {
       /** @type {HTMLCanvasElement} */ 
      let canvas = document.querySelector('#canvas2');
      if (!canvas.getContext) return;
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
    drawRect() {
      let canvas = document.querySelector('#canvas3')
      let ctx = canvas.getContext('2d')
      for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 6; j++) {
          ctx.beginPath()
          // ctx.fillStyle = `rgb(${Math.floor(255 - 42.5*i)}, ${Math.floor(255 - 42.5*j)}, 0)`
          // ctx.arc(12.5+j*25,12.5+i*25,10,0,Math.PI*2,true);
          // ctx.fillRect(i*25,j*25,25,25)
          ctx.strokeStyle = `rgb(${Math.floor(255 - 42.5*i)}, ${Math.floor(255 - 42.5*j)}, 0)`
          ctx.arc(12.5+i*25,12.5+j*25,10,0, Math.PI*2)
          ctx.stroke()
          ctx.closePath()
        }
      }
    },
    drawSmileFace() {
      /** @type {HTMLCanvasElement} */ 
      let canvas = document.querySelector('#canvas4')
      let ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.strokeStyle = '#ddd'
      ctx.arc(75,75,60,0,Math.PI*2)
      ctx.moveTo(125, 75)
      ctx.arc(75,75,50,0,Math.PI)
      ctx.moveTo(60, 60) // 去掉连接线
      ctx.arc(55, 60, 5, 0, Math.PI*2) // 左眼
      ctx.moveTo(100, 60)
      ctx.arc(95, 60, 5, 0, Math.PI*2) // 右眼
      ctx.stroke() // stroke不会自动closePath(), fill()会自动闭合路径。
      ctx.closePath()
    },
    saveAndRestore() {
      /** @type {HTMLCanvasElement} */ 
      let canvas = document.querySelector('#canvas5')
      if (!canvas.getContext) return
      let ctx = canvas.getContext('2d')
      ctx.fillRect(0,0,150,150)
      ctx.save()
      ctx.fillStyle = '#09F'
      ctx.fillRect(15,15,120,120)
      ctx.save()
      ctx.fillStyle = '#fff'
      ctx.globalAlpha = '.5'
      ctx.fillRect(30,30,90,90)
      ctx.restore()
      ctx.fillRect(45,45,60,60)
      ctx.restore()
      ctx.fillRect(60,60,30,30)
    },
    canvas6() {
      /** @type {HTMLCanvasElement} */
      let canvas = document.querySelector('#canvas6')
      if (!canvas.getContext) return
      let ctx = canvas.getContext('2d')
      for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 6; j++) {
          ctx.beginPath()
          ctx.save()
          ctx.fillStyle = `rgb(${Math.floor(51*i)}, ${Math.floor(255-51*j)},0)`
          // ctx.arc(12.5+25*i, 12.5+25*j, 10, 0, Math.PI*2)
          ctx.translate(25*i, 25*j)
          ctx.arc(12.5, 12.5, 10, 0, Math.PI*2)
          ctx.fill()
          ctx.restore()
          ctx.closePath()
          // ctx.save()
          // ctx.fillStyle = `rgb(${Math.floor(51*i)}, ${Math.floor(255-51*j)},0)`
          // ctx.translate(25*i, 25*j)
          // ctx.fillRect(0,0,25,25)
          // ctx.restore()
        }
      }
    },
    canvas7() {
      /** @type {HTMLCanvasElement} */
      let canvas = document.querySelector('#canvas7')
      if (!canvas.getContext) return
      let ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(25, 25)
      ctx.arcTo(100,25,100,100,50) // arcTo(x1,y1,x2,y2,r),参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数5：圆弧半径
      ctx.lineTo(100,100)
      ctx.stroke()
      // 二维贝塞尔曲线
      ctx.beginPath()
      ctx.moveTo(25, 50)
      ctx.quadraticCurveTo(50,75,25,100,50) // quadraticCurveTo(cp1x,cp1y,x,y) 参数1、2:控制点坐标, 参数3、4:结束点坐标
      ctx.stroke()
    },
    canvasLineDash() {
      let lineDash = document.querySelector('.canvasLineDash')
      let canvas = document.createElement('canvas')
      canvas.setAttribute('id', 'canvas8')
      canvas.width = 150
      canvas.height = 150
      canvas.style.cssText = ';position: absolute; left: 0; top: 0;'
      if (!canvas.getContext) return
      let ctx = canvas.getContext('2d')
      ctx.setLineDash([10,3])
      ctx.lineDashOffset = -0;
      ctx.strokeRect(0,0,150,150)
      ctx.font = '40px sans-serif'
      ctx.strokeText('hello', 30, 85)
      lineDash.appendChild(canvas)
    },
    canvas9() {
      /** @type {HTMLCanvasElement} */
      let canvas = document.querySelector('#canvas9')
      if (!canvas.getContext) return
      let ctx = canvas.getContext('2d')
      ctx.beginPath();
      ctx.fillStyle = "pink";
      ctx.arc(75, 75, 50, 0, Math.PI * 2);
      ctx.fill()
      // 1/4天空蓝圆
      ctx.clip();
      ctx.fillStyle = "skyblue";
      ctx.fillRect(75, 75, 100,100);
      // 1/4蓝圆
      ctx.clip()
      ctx.fillStyle = 'blue'
      ctx.fillRect(25,25, 50, 50)
      // 1/4 黄色圆
      ctx.clip()
      ctx.fillStyle = 'yellow'
      ctx.fillRect(75,25, 50, 50)
    },
    canvas10() {
      /** @type {HTMLCanvasElement} */
      let canvas = document.querySelector('#canvas10')
      if (!canvas.getContext) return
      let ctx = canvas.getContext('2d')
      ctx.save()
      ctx.translate(25,25)
      // 1
      ctx.beginPath()
      ctx.fillStyle = 'red'
      ctx.arc(50,50,50,0,Math.PI*2)
      ctx.fill()
      ctx.clip()
      // 2
      ctx.beginPath()
      ctx.fillStyle = 'yellow'
      ctx.arc(100,50,50,0,Math.PI*2)
      ctx.fill()
      // 3
      ctx.beginPath()
      ctx.fillStyle = 'blue'
      ctx.arc(75,100,50,0,Math.PI*2)
      ctx.fill()
      // 4
      ctx.beginPath()
      ctx.strokeStyle = '#ddd'
      ctx.lineWidth = 10
      ctx.arc(50,50,50,0,Math.PI*2)
      ctx.stroke()
      //
      ctx.restore()
    },
    canvas11() {
      /** @type {HTMLCanvasElement} */
      let canvas = document.querySelector('#canvas11')
      if (!canvas.getContext) return
      let ctx = canvas.getContext('2d')
      ctx.beginPath()
      for(let i=0; i<5; i++) {
        ctx.lineTo(Math.cos((18+72*i)/180*Math.PI)*75+75, -Math.sin((18+72*i)/180*Math.PI)*75+75)
        ctx.lineTo(Math.cos((54+72*i)/180*Math.PI)*50+75, -Math.sin((54+72*i)/180*Math.PI)*50+75)
      }
      ctx.closePath()
      ctx.lineWidth = 2
      ctx.strokeStyle = 'orange'
      ctx.stroke()
      // ctx.clip()
      ctx.beginPath()
      ctx.strokeStyle = 'orange'
      ctx.arc(75,75,75,0,Math.PI*2)
      // ctx.moveTo(125,75)
      // ctx.arc(75,75,50,0,Math.PI*2)
      ctx.stroke()
      ctx.closePath()
    }
  }
}
</script>
<style lang="scss" scoped>
  .ball-move {
    height: 900px;
  }
  #canvas, #canvas2, #canvas3, #canvas4, #canvas5, #canvas6, #canvas7, #canvas9, #canvas10, #canvas11 {
    margin: 20px;
    border: 1px solid #ddd;
  }
  .canvasLineDash {
    position: relative;
    display: inline-block;
    width: 150px;
    height: 150px;
    margin: 20px;
    padding: 50px;
    box-sizing: border-box;
    .box {
      width: 50px;
      height: 50px;
      background: skyblue;
    }
  }
</style>