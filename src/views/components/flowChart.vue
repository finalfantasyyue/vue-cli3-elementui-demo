<template>
  <div class="flow-chart">
    <div class="questionnaire">
      <!--问题-->
      <div
        class="question"
        :style="{border: this.questionObj.type === 'question' ? `1px solid ${questionObj.borderColor}` : ''}"
        @dblclick="editInput($event,'question', '', questionObj)"
        @click="selectCard('question', '', questionObj)"
      >
        <div class="title">问题</div>
        <el-input
          ref="questionInput"
          type="text"
          class="question-input"
          v-model="questionObj.content"
          v-show="questionObj.isEdit"
        ></el-input>
        <div class="content" v-show="!questionObj.isEdit" v-html="questionObj.content"></div>
      </div>
      <flow-chart-item
        :questionObj="questionObj"
        :rootAnswer="questionObj.answer"
        @type="questionType"
      ></flow-chart-item>
    </div>
  </div>
</template>

<script>
import flowChartItem from "./flowChartItem";
import flowChart from "./flowChart";
export default {
  name: "flowChart",
  mixins: [flowChart],
  components: {
    flowChartItem
  },
  data() {
    return {
      flowData: {},
      questionObj: {
        id: +new Date(),
        type: null,
        index: null,
        borderColor: "",
        isEdit: false,
        content: "是否诊断为继发性高血压",
        answer: [
          {
            id: +new Date(),
            selected: false,
            isEdit: false,
            type: null,
            iconSelect: false, // 用于判断icon是否有一个被点击
            answerIndex: null, // 第几个答案被选中
            content: "是",
            result: {
              content: "",
              dialogContent: "",
              selected: false,
              isShow: false
            },
            relation: {
              content: "",
              selected: false,
              isShow: false
            },
            // 答案后只能有一个问题
            question: {
              content: "",
              selected: false,
              isShow: false,
              isEdit: false,
              children: {
                answer: []
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
    // 回车事件
    this.enterKeydown()
    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("keydown", this.enterKey);
    });
  },
  methods: {
    enterKeydown() {
      document.addEventListener("keydown", this.enterKey);
    },
    enterKey(event) {
      const key = event.keyCode;
      if (key === 13 && this.questionObj.type === "question") {
        const id = +new Date();
        this.questionObj.answer.push({
          id: id,
          selected: false,
          isEdit: false,
          iconSelect: false, // 用于判断icon是否有一个被点击
          answerIndex: null,
          content: "是",
          result: {
            content: "",
            dialogContent: "",
            selected: false,
            isShow: false
          },
          relation: {
            content: "",
            selected: false,
            isShow: false
          },
          question: {}
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin card-title($color, $background) {
  display: inline-block;
  width: 100%;
  height: 40px;
  padding: 11px 15px;
  border-bottom: 1px solid $color;
  background: $background;
  box-sizing: border-box;
}

@mixin content {
  padding: 10px 15px;
  height: 105px;
  overflow-y: auto;
  word-break: break-all;
  box-sizing: border-box;
}

.flow-chart {
  width: 100%;
  font-size: 14px;
  padding: 40px 30px;
  text-align: left;
  color: #606266;
  border: 1px solid #d9efee;
  overflow-x: auto;

  .questionnaire {
    display: flex;
    overflow: auto;
    .question {
      width: 260px;
      height: 160px;
      flex: 260px 0 0;
      border: 1px solid #d9efee;
      cursor: pointer;
      box-sizing: border-box;

      .title {
        @include card-title(#e6f5f4, #f7fcfc);
      }

      .content {
        @include content;
      }
      &:hover {
        border: 1px solid #80ddd5;
      }
    }
  }
}
</style>