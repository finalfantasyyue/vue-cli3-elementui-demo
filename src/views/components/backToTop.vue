<template>
  <div class="back-to-top">
    <h2 class="back-title">{{$t('route.backToTop')}}</h2>
    <transition name="fade">
      <div class="back-to-top-btn" v-if="isShowTopBtn" @click="backToTop">
        <i class="el-icon-caret-top"></i>
      </div>
    </transition>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
    <p>填充内容</p>
  </div>
</template>
<script>
export default {
  name: "top",
  data() {
    return {
      isShowTopBtn: false,
      scrollTop: ""
    };
  },
  computed: {},
  watch: {
    scrollTop() {
      if (this.scrollTop > 200) {
        this.isShowTopBtn = true;
      } else {
        this.isShowTopBtn = false;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrollTop = window.pageYOffset;
    },
    backToTop() {
      /* let timer = null;
          _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
          if (_that.scrollTop > 0) {
              _that.scrollTop -= 50;
              document.body.scrollTop = document.documentElement.scrollTop =
                  _that.scrollTop;
              timer = requestAnimationFrame(fn);
          } else {
              cancelAnimationFrame(timer);
              _that.goTopShow = false;
          }
      }); */
      let timer = null;
      timer = setInterval(function() {
        var osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        if (osTop == 0) {
          window.clearInterval(timer);
        }
      }, 30);
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.back-to-top {
  position: relative;
  margin: 20px;
  .back-title {
    margin-bottom: 10px;
  }
  .back-to-top-btn {
    position: fixed;
    display: flex;
    right: 100px;
    bottom: 100px;
    width: 40px;
    height: 40px;
    font-size: 20px;
    align-items: center;
    justify-content: center;
    color: #409eff;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    &:hover {
      background: #f2f6fc;
    }
  }
  p {
    height: 34px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<style>
body::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 0, 0, 0);
  border-left: 1px solid rgba(0, 0, 0, 0);
}
body::-webkit-scrollbar {
  width: 5px;
  height: 13px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
body::-webkit-scrollbar-thumb {
  background-color: #327ffc;
  background-clip: padding-box;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  min-height: 28px;
}
body::-webkit-scrollbar-thumb:hover {
  background-color: #327ffc;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
</style>


