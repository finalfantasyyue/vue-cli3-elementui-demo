<template>
  <div class="canvas">
    <img id="img" src="./logo.png" alt="ddd" style="display: none;">
    <canvas id="canvas1">
      浏览器不支持
    </canvas>
    <input type="range" id="scale_draw" min="0.5" max="3.0" step="0.01" value="1.0">
    <canvas id="waterMark">
      浏览器不支持
    </canvas>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "cv",
    data() {
      return {}
    },
    created() {
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const canvas = document.getElementById('canvas1')
        const waterMarkCanvas = document.getElementById('waterMark')
        const image = document.getElementById('img')
        const slider = document.getElementById('scale_draw')

        let context = canvas.getContext('2d')
        let waterMarkCtx = waterMarkCanvas.getContext('2d')
        canvas.width = 576
        canvas.height = 384
        waterMarkCanvas.width = 150
        waterMarkCanvas.height = 50
        let scale = slider.value
        // let image = new Image()
        // image.src = './logo.png'
        waterMarkCtx.font = '20px bold Arial'
        waterMarkCtx.fillStyle = 'red'
        waterMarkCtx.fillText('**finalfantasy**', 0, 40)
        image.onload = function() {

          context.drawImage( image, 0, 0, canvas.width, canvas.height )
          slider.onmousemove = function() {
            scale = slider.value
            const imageW = 576 * scale
            const imageH = 384 * scale
            const dx = canvas.width / 2 - imageW / 2
            const dy = canvas.height / 2 - imageH / 2

            context.clearRect(0, 0, canvas.width, canvas.height)
            context.drawImage( image, dx, dy, imageW, imageH )
            context.drawImage(waterMarkCanvas, canvas.width - waterMarkCanvas.width, canvas.height - waterMarkCanvas.height)
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .canvas {
    background: black;
    #canvas {
      display: block;
      margin: 20px auto;
      border: 1px solid #ddd;
    }
    #scale_draw {
      display: block;
      width: 500px;
      margin: 10px auto;
    }
    #waterMark {
      display: none;
      border: 1px solid #ff6d2c;
    }
  }
</style>