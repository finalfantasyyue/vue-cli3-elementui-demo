<template>
  <div class="test">
    <div class="row" id="pdfDoms" style="padding-top: 55px;background-color:#fff;">
        <div>dfsafdsfdsafdsfdsfdsafdsa</div>
    </div>
    <button type="button" class="btn btn-primary" @click="print">打印</button>
    <button type="button" class="btn btn-primary" @click="getPdf()">导出PDF</button>
    <div class="wrap">
      <p>我的宽度是正常宽度</p>
      <p>我的宽度是溢出了一小部分</p>
      <p>我的宽度是溢出了溢出了溢出了很大很大一部分</p>
    </div>
    <div class="swiper-container">
      <swiper
       ref="mySwiper" 
       :options="swiperOptions" 
       class="swiper"
       >
        <swiper-slide class="swiper-slide">Slide 1</swiper-slide>
        <swiper-slide class="swiper-slide">Slide 2</swiper-slide>
        <swiper-slide class="swiper-slide">Slide 3</swiper-slide>
        <swiper-slide class="swiper-slide">Slide 4</swiper-slide>
        <swiper-slide class="swiper-slide">Slide 5</swiper-slide>
      </swiper>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev" @click="prev"></div>
      <div class="swiper-button-next" slot="button-next" @click="next"></div>
    </div>
    <div class="slide-box">
      <div class="slide-list" ref="slideList">
        <div class="slide">1</div>
        <div class="slide">2</div>
        <div class="slide">3</div>
        <div class="slide">4</div>
      </div>
    </div>
    <div>
      <mindmap v-model="mindmapData" style="height: 500px;"></mindmap>
    </div>
    <div class="tribute">
      tribute: <el-input type="text" id="tributeNode" ref="tribute" v-model="tributeValue"></el-input>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import mindmap from '@hellowuxin/mindmap'
import Tribute from 'tributejs'
export default {
  name: 'test',
  components: {
    Swiper,
    SwiperSlide,
    mindmap
  },
  data () {
    return {
      swiperOptions: {
        observer: true,
        observeParents: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      htmlTitle: '页面导出PDF文件名',
      tributeValue: '',
      mindmapData: [{
        "name":"如何学习D3",
        "children": [
          {
            "name":"预备知识",
            "children": [
              { "name":"HTML & CSS" },
              { "name":"JavaScript" }
            ]
          },
          {
            "name":"安装",
            "_children": [
              { "name": "折叠节点" }
            ]
          },
          {
            "name":"进阶",
            "left": true
          }
        ]
      }]
    }
  },
  created() {
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.swiper.slideTo(3, 1000, false)
    })
    // 仿微信@操作
    this.initTribute()
    console.log(this.tributeValue)
  },
  methods: {
    initTribute() {
      let tribute = new Tribute({
        // menuContainer: document.getElementById('tributeNode'),
        values: [
          {
            key: "Jordan Humphreys",
            value: "Jordan Humphreys",
            email: "getstarted@zurb.com"
          },
          {
            key: "Sir Walter Riley",
            value: "Sir Walter Riley",
            email: "getstarted+riley@zurb.com"
          }
        ],
        selectTemplate: function(item) {
          if (typeof item === "undefined") return null;
          if (this.range.isContentEditable(this.current.element)) {
            return (
              '<span contenteditable="false"><a href="http://zurb.com" target="_blank" title="' +
              item.original.email +
              '">' +
              item.original.value +
              "</a></span>"
            );
          }

          return "@" + item.original.value;
        },
        requireLeadingSpace: false
      })
      tribute.attach(document.getElementById("tributeNode"));
      // tribute.attach(this.$refs.tribute);
    },
    print() {
      window.print()
    },
    prev() {
      // console.log(v)
      window.console.log(this.swiper.activeIndex)
    },
    next() {
      // console.log(v)
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  @import '~tributejs/dist/tribute.css';
  .wrap {
    position: relative;
    width: 170px;
    background: #e5e5e5;
    margin: 20px 0;
    overflow: hidden;
    p {
      display: inline-block;
      padding: 10px;
      white-space: nowrap;
      &:hover {
        animation: move 1.5s infinite alternate linear;
      }
    }
    @keyframes move {
      0% {
        margin-left: 0;
        transform: translate(0, 0); 
        // transform: translate(0, 0); // 固定宽度
      }
      100% {
        margin-left: 100%;
        transform: translate(-100%, 0);
        // transform: translate(calc(-100% + 170px), 0) // 固定宽度只需这一行
      }
    }
  }
  .swiper-container {
    width: 200px;
    background: #ddd;
    .swiper-wrapper {
      width: 200px;
    }
    .swiper-slide {
      width: 200px !important;
    }
  }
  .slide-box {
    width: 400px;
    height: 20px;
    background: #ddd;
    .slide-list {
      display: flex;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .slide {
      display: inline-block;
      width: 200px;
      flex-shrink: 0;
    }
  }
</style>


