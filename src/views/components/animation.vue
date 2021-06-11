<template>
  <div class="input-wrapper" @click="idiom" ref="inputWrapper">
    <el-form :model="form" :rules="rules" inline class="form-inline" label-width="100px">
      <el-form-item prop="name" class="form-group-label">
        <label for="name" class="floating-label">名称</label>
        <el-input
          v-model="form.name"
          id="name"
          class="form-control"
          @focus="inputFocus($event)"
          @blur="inputBlur($event)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" class="form-group-label">
        <label for="password" class="floating-label">密码</label>
        <el-input
          type="password"
          id="password"
          v-model="form.password"
          class="form-control"
          @focus="inputFocus($event)"
          @blur="inputBlur($event)"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="hover效果1">
            <div class="box"></div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="hover效果2">
            <div class="box2"></div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="水波纹">
            <el-button v-waves type="primary">水波纹效果</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="自运动">
            <div class="box3"></div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="自运动">
            <div class="box4"></div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="按钮">
            <el-button type="primary" class="btn-hover">按钮hover效果</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="回弹"></el-form-item>
          <div class="box5"></div>
        </el-col>
        <el-col :span="8">
          <el-form-item label="hover"></el-form-item>
          <div class="box6"></div>
        </el-col>
        <el-col :span="8">
          <el-form-item label="加载">
            <div class="box7"></div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="hover">
            <div class="box8">
              <span>hover me</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="loading">
            <div class="box9">
              <div class="shape shape1"></div>
              <div class="shape shape2"></div>
              <div class="shape shape3"></div>
              <div class="shape shape4"></div>
              <div class="shape shape5"></div>
          </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="loading">
            <div class="box10">
              <div class="shape shape1"></div>
              <div class="shape shape2"></div>
              <div class="shape shape3"></div>
              <div class="shape shape4"></div>
              <div class="shape shape5"></div>
            </div>                
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="阶梯">
            <div class="box11">
              <div class="box11__bar"></div>
              <div class="box11__bar"></div>
              <div class="box11__bar"></div>
              <div class="box11__bar"></div>
              <div class="box11__bar"></div>
              <div class="box11__ball"></div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="抖音加载">
            <div class="box12">
              <div class="ball ball1"></div>
              <div class="ball ball2"></div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="loading">
            <div class="box13">
              <div class="rect rect1"></div>
              <div class="rect rect2"></div>
              <div class="rect rect3"></div>
              <div class="rect rect4"></div>
              <div class="rect rect5"></div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="loading">
            <div class="box14"></div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="vars">
            <div class="box15">
              <p>{{ vars }}</p>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="css-new-feature">
      <div class="css-title">css新特性</div>
      <div class="paragraph">
        <p>You can select me.</p>
        <p class="unselect">You can't select me!</p>
        <p class="change-select-style">Select some of this text.</p>
      </div>
      <div class="height-transition">
        Hover me to see a height transition.
        <div class="el">content</div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import waves from "@/directive/waves/index";
export default {
  name: "inputs",
  data() {
    return {
      letter: "aaabbbaaaabbaccccdddeefasadcc",
      arr: [{ name: "", num: "" }],
      form: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      index: 0,
      vars: 'vue vars',
      opacity: 0.2,
      cy: [
        "新年快乐",
        "恭贺新禧",
        "万事亨通",
        "万事如意",
        "身体健康",
        "工作顺利",
        "爱情甜蜜",
        "生活美满"
      ]
    };
  },
  created() {
    this.$nextTick(() => {
      const el = document.querySelector(".el");
      const height = el.scrollHeight;
      el.style.setProperty("--max-height", height + "px");
      // hover me
      let hoverMe = document.querySelector('.box8');
      hoverMe.onmousemove = function(e) {
        const x = e.pageX - hoverMe.offsetLeft - hoverMe.offsetParent.offsetLeft;
        const y = e.pageY - hoverMe.offsetTop - hoverMe.offsetParent.offsetTop;
        hoverMe.style.setProperty('--x', x + 'px');
        hoverMe.style.setProperty('--y', y + 'px');
      }
    });
  },
  mounted() {
    setInterval(() => {
      this.opacity >=1 && (this.opacity = 0)
      this.opacity += 0.2
    }, 300)
  },
  computed: {},
  methods: {
    idiom(e) {
      // 成语
      let div = document.createElement("div");
      div.classList.add("idiom-class");
      div.innerHTML = this.cy[this.index];
      this.index = (this.index + 1) % this.cy.length;
      $(div).css({
        left: e.clientX - 200,
        top: e.clientY,
        color: "#f00"
      });
      $(div).animate(
        {
          left: e.clientX - 200,
          top: e.clientY - 50
        },
        800,
        function() {
          $(this).remove();
        }
      );
      this.$refs.inputWrapper.append(div);
    },
    inputFocus(e) {
      const label = e.target.labels[0];
      label.classList.add("control-focus");
    },
    inputBlur(e) {
      const label = e.target.labels[0];
      label.classList.remove("control-focus");
    }
  }
};
</script>
<style>
.idiom-class {
  position: absolute;
  color: red;
}
</style>

<style lang="scss" vars="{opacity}" scoped>
.input-wrapper {
  .form-inline {
    margin: 40px;
    .form-group-label {
      position: relative;
      .floating-label {
        position: absolute;
        color: #909090;
        padding-left: 15px;
        z-index: 1;
        transition: all 0.3s;
      }
    }
    .box {
      width: 200px;
      height: 40px;
      background: #ddd;
      &:after {
        content: "";
        width: 0;
        height: 2px;
        position: absolute;
        left: 50%;
        bottom: 0;
        background: red;
        transition: all 0.8s;
      }
      &:hover:after {
        left: 0;
        width: 100%;
      }
    }
    .box2 {
      width: 200px;
      height: 40px;
      background: #ddd;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 2px;
        background: red;
        transition: all 0.8s;
      }
      &:after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0;
        height: 2px;
        background: red;
        transition: all 0.8s;
      }
      &:hover:before {
        width: 100%;
      }
      &:hover:after {
        width: 100%;
      }
    }
    .box3 {
      width: 200px;
      height: 40px;
      background: #ddd;
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: red;
        animation: move1 2s infinite;
      }
    }
    .box4 {
      width: 50px;
      height: 40px;
      background: #ddd;
      margin: 0 75px;
      animation: move2 2s infinite;
    }
    .box5 {
      display: inline-block;
      width: 50px;
      height: 40px;
      background: #ddd;
      margin: 0 75px;
      animation: upAnimation 2s infinite;
    }
    .box6 {
      display: inline-block;
      position: relative;
      width: 200px;
      height: 40px;
      background: #ddd;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 2px;
        background: red;
        transform: scaleX(0);
        transform-origin: top left;
        transition: transform 0.8s ease-out;
      }
      &:hover::before {
        transform: scaleX(1);
        transform-origin: top right;
      }
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 100%;
        background: red;
        transform: scaleX(0);
        transform-origin: bottom right;
        transition: transform 0.8s ease-out;
      }
      &:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }
    }
    .box7 {
      display: inline-block;
      border: 4px solid #ddd;
      border-radius: 50%;
      height: 30px;
      width: 30px;
      border-left-color: rgb(64, 158, 255);
      animation: spinner 1.2s linear infinite;
    }
    .box8 {
      display: inline-block;
      position: relative;
      width: 200px;
      height: 40px;
      background: #ddd;
      color: white;
      border: 0;
      cursor: pointer;
      text-align: center;
      outline: none;
      overflow: hidden;
      span {
        position: relative;
      }
      span::selection {
        background: red;
      }
      &::before {
        --size: 0;
        content: '';
        position: absolute;
        left: var(--x);
        top: var(--y);
        width: var(--size);
        height: var(--size);
        background: radial-gradient(circle closest-side, pink, transparent);
        transform: translate(50%, 50%);
        transition: width 0.2s ease, height 0.2s ease;
      }
      &:hover::before{
        --size: 200px;
      }
      // &:hover {
        color: #f30;
        text-decoration: none;
        background: radial-gradient(black, transparent);
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='%23f30' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E") repeat-x 0 100%; 
        background-size: 20px auto;
        animation: waveMove 1s infinite linear;
      // }
    }
    .box9 {
      width: 200px;
      height: 80px;
      border: 1px solid #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
      .shape{
        position: relative;
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      .shape1 {
        left: 0;
        top: 0;
        background: red;
        animation: knock1 .75s infinite;
      }
      .shape2 {
        background: yellow;
      }
      .shape3 {
        background: orange;
      }
      .shape4 {
        background: #0a74da;
      }
      .shape5 {
        background: #304156;
        animation: knock2 .75s infinite;
      }
    }
    .box10 {
      width: 200px;
      height: 80px;
      border: 1px solid #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
      .shape{
        position: relative;
        width: 20px;
        height: 20px;
        margin:0 5px;
        border-radius: 3px;
        animation: loading 1.75s infinite;
      }
      .shape1 {
        left: 0;
        top: 0;
        background: red;
      }
      .shape2 {
        background: yellow;
        animation-delay: 0.2s;
      }
      .shape3 {
        background: orange;
        animation-delay: 0.5s;
      }
      .shape4 {
        background: #0a74da;
        animation-delay: 0.8s;
      }
      .shape5 {
        background: #304156;
        animation-delay: 1.1s;
      }
    }
    .box11 {
      position: relative;
      width: 75px;
      height: 100px;
      &__bar {
        position: absolute;
        bottom: 0;
        width: 10px;
        height: 50%;
        background: #ddd;
        transform-origin: center bottom;
        box-shadow: 2px 0 2px rgba(0,0,0,0.2);
        @for $i from 1 through 5 {
          &:nth-child(#{$i}) {
            left: ($i - 1) * 15px;
            transform: scale(1, $i * .2);
            animation: barUp#{$i} 4s infinite;
          }
        }
      }
      &__ball {
        position: absolute;
        left: 0;
        bottom: 10px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ddd;
        animation: ball 4s infinite;
      }
    }
    .box12 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 100px;
      transition: all .5s;
      .ball {
        width: 15%;
        padding-top: 15%; // padding-top 代替高，取得父元素width
        border-radius: 50%;
      }
      .ball1 {
        background: #ff6d2c;
        margin-right: 2%;
        animation: ball1 1.5s ease-in-out infinite;
      }
      .ball2 {
        background: #4a9ff9;
        animation: ball2 1.5s ease-in-out infinite;
      }
    }
    .box13 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 100px;
      border: 1px solid #ddd;
      .rect {
        width: 6px;
        height: 60px;
        margin: 0 4px;
        background: #42800f;
        animation: stretch 1.2s infinite ease-in-out;
      }
      .rect2 {
        animation-delay: -1.1s
      }
      .rect3 {
        animation-delay: -1s
      }
      .rect4 {
        animation-delay: -0.9s
      }
      .rect5 {
        animation-delay: -.8s
      }
    }
    .box14 {
      display: flex;
      jusitify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      background: #5a5a5a;
      border-radius: 50%;
      /*background-image: linear-gradient(to right,transparent 50%,#655 0)*/
      border: 2px solid #f99d05;
    }
    .box15 {
      opacity: var(--opacity)
    }
    @keyframes stretch {
      0%, 40%, 100% {
        transform: scaleY(0.4)
      }
      20% {
        transform: scaleY(1);
      }
    }
    @keyframes ball1 {
      0% {
        transform: translate(0px 0px);
      }
      50% {
        transform: translate(30px, 0px);
      }
      100% {
        transform: translate(0);
      }
    }
    @keyframes ball2 {
      0% {
        transform: translate(0px 0px);
      }
      50% {
        transform: translate(-30px,0);
      }
      100% {
        transform: translate(0px);
      }
    }
    @keyframes ball {
      0% {
        transform: translate(0, 0);
      }
      5% {
        transform: translate(8px, -14px);
      }
      10% {
        transform: translate(15px, -10px)
      }
      17% {
        transform: translate(23px, -24px)
      }
      20% {
        transform: translate(30px, -20px)
      }
      27% {
        transform: translate(38px, -34px)
      }
      30% {
        transform: translate(45px, -30px)
      }
      37% {
        transform: translate(53px, -44px)
      }
      40% {
        transform: translate(60px, -40px)
      }
      50% {
        transform: translate(60px, 0)
      }
      57% {
        transform: translate(53px, -14px)
      }
      60% {
        transform: translate(45px, -10px)
      }
      67% {
        transform: translate(37px, -24px)
      }
      70% {
        transform: translate(30px, -20px)
      }
      77% {
        transform: translate(22px, -34px)
      }
      80% {
        transform: translate(15px, -30px)
      }
      87% {
        transform: translate(7px, -44px)
      }
      90% {
        transform: translate(0, -40px)
      }
      100% {
        transform: translate(0, 0);
      }
    }
    @keyframes barUp1 {
      0% {
        transform: scale(1, .2)
      }
      40% {
        transform: scale(1, .2)
      }
      50% {
        transform: scale(1, 1)
      }
      90% {
        transform: scale(1, 1)
      }
      100% {
        transform: scale(1, .2)
      }
    }
    @keyframes barUp2 {
      0% {
        transform: scale(1, .4)
      }
      40% {
        transform: scale(1, .4)
      }
      50% {
        transform: scale(1, .8)
      }
      90% {
        transform: scale(1, .8)
      }
      100% {
        transform: scale(1, .4)
      }
    }
    @keyframes barUp3 {
      from {
        transform: scale(1, .6)
      }
      to {
        transform: scale(1, .6)
      }
    }
    @keyframes barUp4 {
      0% {
        transform: scale(1, .8)
      }
      40% {
        transform: scale(1, .8)
      }
      50% {
        transform: scale(1, .4)
      }
      90% {
        transform: scale(1, .4)
      }
      100% {
        transform: scale(1, .8)
      }
    }
    @keyframes barUp5 {
      0% {
        transform: scale(1, 1)
      }
      40% {
        transform: scale(1, 1)
      }
      50% {
        transform: scale(1, .2)
      }
      90% {
        transform: scale(1, .2)
      }
      100% {
        transform: scale(1, 1)
      }
    }
    .btn-hover {
      border-radius: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      transition: all 0.3s;
      &:hover {
        border-radius: 5px;
      }
    }
  }
  .css-new-feature {
    margin: 50px 20px 20px;
    border-top: 1px solid #ddd;
    .css-title {
      margin-top: 20px;
      font-size: 18px;
      font-family: bold;
    }
    .paragraph {
      p {
        line-height: 34px;
      }
      .unselect {
        user-select: none;
      }
      .change-select-style::selection {
        background: red;
        color: #fff;
      }
    }
  }
  .height-transition {
    padding: 10px;
    background: #ddd;
    .el {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s;
    }
    &:hover > .el {
      height: 20px;
      max-height: var(--max-height);
    }
  }
}
@keyframes knock1 {
  0% {
    left: -15px;
    top: -5px;
  }
  25% {
    left: 0;
    top: 0;
  }
  50% {
    left: 0px;
    top: 0px;
  }
  75% {
    left: 0;
    top: 0;
  }
  100% {
    left: -15px;
    top: -5px;
  }
}
@keyframes knock2 {
  0% {
    right: 0px;
    top: 0px;
  }
  25% {
    right: 0;
    top: 0;
  }
  50% {
    right: -15px;
    top: -5px;
  }
  75% {
    right: 0;
    top: 0;
  }
  100% {
    right: 0px;
    top: 0px;
  }
}
@keyframes loading {
  0% {
    opacity: .3;
    transform: scale(.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: .3;
    transform: scale(.5);
  }
}
@keyframes waveMove {
  from {
    background-position: 0 100%
  }
  to {
    background-position: -20px 100%
  }
}
@keyframes spinner {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes move1 {
  50% {
    left: 0;
    width: 200px;
  }
}
@keyframes move2 {
  50% {
    transform: scaleX(4);
  }
}
@keyframes upAnimation {
  0%,
  100%,
  20%,
  50%,
  80% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -20px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}
.control-focus {
  transform: translateY(-34px) translateX(-15px);
}
</style>

