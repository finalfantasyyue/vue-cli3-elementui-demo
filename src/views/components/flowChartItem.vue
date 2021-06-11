<template>
  <!--答案-->
  <div class="answers">
    <div class="answer-list"
         v-for="(answer, index) in questionObj.answer"
         :key="index"
    >
      <!--答案列表-->
      <div class="answer"
           :ref="`answer${index}`"
           @click="selectCard('answer', index, answer)"
           @dblclick="editInput($event,'answer', index, answer)"
           :style="{border: questionObj.type === 'answer' && answer.selected ? `1px solid ${questionObj.borderColor}` : ''}"
      >
        <div class="title">
          <span style="display: none">{{answer.selected}}</span><!--用于数据更新界面没更新， 代替this.$set(obj,prop,value)-->
          <span>答案{{index + 1}}</span>
          <span class="icon">
            <span :class="[answer.iconSelect ? 'resultGray-icon' : 'result-icon']"
                  @click="selectIcon(index, 'result')"
            >
            </span>
            <span :class="[answer.iconSelect ? 'relationGray-icon' : 'relation-icon']"
                  @click="selectIcon(index, 'relationDisease')"
            >
            </span>
          </span>
        </div>
        <el-input type="text" :ref="answer.id" v-show="answer.isEdit" class="question-input" v-model="answer.content"></el-input>
        <el-tooltip
            :disabled="isShowAnswerContentTooltip"
            effect="dark"
            :content="answer.content"
            placement="top"
        >
          <div class="content"
               v-show="!answer.isEdit"
               @mouseenter="showAnswerContentTooltip(answer.content, $event)"
          >{{answer.content}}</div>
        </el-tooltip>
      </div>
      <!--问题-->
      <div class="question"
           v-show="answer.question.isShow"
           :style="{border: questionObj.type === `question${index}` && answer.question.selected ? `1px solid ${questionObj.borderColor}` : ''}"
           @dblclick="editInput($event,`question${index}`, index, answer)"
           @click="selectCard(`question${index}`, index, answer)"
      >
        <span style="display: none">{{answer.question.selected}}</span>
        <div class="title">问题</div>
        <el-input :ref="'question' + index" type="text" class="question-input" v-model="answer.question.content"
                  v-show="answer.question.isEdit"></el-input>
        <div class="content" v-show="!answer.question.isEdit">{{answer.question.content}}</div>
      </div>
      <!--结论-->
      <div class="result-list" v-show="answer.result.isShow">
        <div class="result"
             @click="selectCard('result', index, answer)"
             :style="{border: questionObj.type === 'result' && answer.result.selected ? `1px solid ${questionObj.borderColor}` : ''}"
        >
          <div class="title">
            <span>结论</span>
            <span
                class="relation-icon"
                v-show="answer.result.content === 'chuze' || answer.result.content === 'zrg'"
                @click="dialogHandle(answer.result, index)"
            ></span>
          </div>
          <el-select
              @focus="selectCard('result', index, answer)"
              @change="resultChange($event, answer)"
              style="width: 225px"
              class="select-result"
              v-model="answer.result.content"
          >
            <el-option label="健康" value="health"></el-option>
            <el-option label="高烧" value="高烧"></el-option>
            <el-option label="低烧" value="低烧"></el-option>
            <el-option label="除责话术" value="chuze"></el-option>
            <el-option label="转人工话术" value="zrg"></el-option>
          </el-select>
          <el-tooltip
              class="tooltip-dialog-content"
              effect="dark"
              :content="answer.result.dialogContent"
              placement="top"
              :style="`left: ${answer.result.width}`"
          >
            <span class="result-detail" v-show="answer.result.dialogContent"></span>
          </el-tooltip>
        </div>
      </div>
      <!--关联疾病-->
      <div class="result-list" v-show="answer.relation.isShow">
        <span style="display: none">{{answer.relation.selected}}</span>
        <div class="relation-disease"
             @click="selectCard('relationDisease', index, answer)"
             :style="{border: questionObj.type === 'relationDisease' && answer.relation.selected ? `1px solid ${questionObj.borderColor}` : ''}"
        >
          <span class="title">关联疾病</span>
          <el-select
              @focus="selectCard('relationDisease', index, answer)"
              style="width: 225px"
              class="select-result"
              v-model="answer.relation.content"
          >
            <el-option value="甲状腺">甲状腺</el-option>
            <el-option value="贫血">贫血</el-option>
            <el-option value="血糖高">血糖高</el-option>
          </el-select>
        </div>
      </div>
      <flow-chart-item :questionObj="answer.question.children" :rootAnswer="firstLevelAnswers" @type="questionType"
                       v-if="answer.question.children && answer.question.children.answer && answer.question.children.answer.length > 0"></flow-chart-item>
    </div>
    <!-- 弹窗放到循环里，当第一组答案后直接跟结论，获取到的都是第一组弹窗的最后一个值 -->
    <el-dialog
        v-if="questionObj.answer.length"
        class="flow-chart-result-dialog"
        :visible.sync="showDialog"
        :title="dialogTitle"
        width="50%"
        :close-on-click-modal="false"
    >
      <el-input type="textarea" :rows="5" placeholder="请输入内容"
                v-model="questionObj.answer[dialogIndex].result.dialogContent"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog(questionObj.answer[dialogIndex].result)">取消</el-button>
        <el-button type="primary" @click="showDialog = false">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import flowChart from './flowChart'

  export default {
    name: 'flowChartItem',
    mixins: [flowChart],
    props: {
      questionObj: {
        type: Object,
        required: true,
        default: () => {
        }
      },
      rootAnswer: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      firstLevelAnswers() {
        return this.rootAnswer
      }
    },
    data() {
      return {
        showDialog: false,
        dialogTitle: '',
        dialogContent: '', // 用于判断弹窗是否有值，若没值点击取消清空弹窗内容
        dialogIndex: 0
      }
    },
    mounted() {
      // 回车事件
      this.enterKeydown()
      // delete键
      this.deleteDown()
      this.$once('hook:beforeDestroy', () => {
        document.removeEventListener('keydown', this.enterKey)
      })
    },
    methods: {
      // 结论为：除责、转人工话术，点击icon弹窗
      dialogHandle(result, index) {
        result.content === 'chuze' ? this.dialogTitle = '除责话术' : this.dialogTitle = '转人工话术'
        this.showDialog = true
        this.dialogIndex = index
        this.dialogContent = result.dialogContent
      },
      contentWidth(con) {
        const span = document.createElement('span')
        span.style.cssText = ';display: inline-block;'
        span.textContent = con
        document.body.appendChild(span)
        const spanWidth = span.clientWidth
        document.body.removeChild(span)
        return spanWidth
      },
      // 当答案内容显示...时，tooltip显示
      showAnswerContentTooltip(con, e) {
        this.isShowAnswerContentTooltip = true
        const spanWidth = this.contentWidth(con)
        spanWidth < e.target.clientWidth ? this.isShowAnswerContentTooltip = true : this.isShowAnswerContentTooltip = false
      },
      resultChange(val, answer) {
        let con = null
        if (val === 'chuze') {
          con = '除责话术'
        } else if (val === 'zrg') {
          con = '转人工话术'
        }
        const spanWidth = this.contentWidth(con)
        answer.result.dialogContent = ''
        answer.result.width = spanWidth + 30 + 'px'
      },
      cancelDialog(result) {
        if (!this.dialogContent) {
          result.dialogContent = ''
        } else {
          result.dialogContent = this.dialogContent
        }
        this.showDialog = false
      },
      enterKeydown() {
        document.addEventListener('keydown', this.enterKey)
      },
      deleteDown() {
        document.addEventListener('keydown', this.deleteKey)
      },
      loopEnter(answers, type) {
        const len = answers.length
        let num = 0
        for (let i = 0; i < len; i++) {
          if (answers[i].selected && type === 'answer') {
            /*
            * 答案后面只能添加一个问题，再次回车时，提示"只能添加一个问题"
            * isQuestion用于判断答案后是否有问题
            * */
            const isQuestion = ('id' in answers[i].question)
            if (!('id' in answers[i].question) && !answers[i].iconSelect) {
              answers[i].id = +new Date()
              answers[i].relation.isShow = false
              answers[i].relation.selected = false
              answers[i].iconSelect = true
              this.$set(answers[i], 'result', {
                isShow: false,
                selected: false
              })
              answers[i].question = {
                content: '',
                id: +new Date(),
                selected: false,
                isShow: true,
                isEdit: false,
                children: {
                  answer: []
                }
              }
            } else {
              if (answers[i].iconSelect && !isQuestion) {
                this.$message.warning('已有结论或关联疾病，不能添加问题')
              } else if (isQuestion) {
                this.$message.warning('只能添加一个问题')
              }

              return
            }
            break
          } else if (answers[i].question.selected && type === 'question') {
            /*
            * 回车问题可添加多个答案
            * */
            answers[i].id = +new Date()
            answers[i].result.isShow = false
            answers[i].relation.isShow = false
            answers[i].iconSelect = true
            const answer = {
              id: +new Date(),
              selected: false,
              isEdit: false,
              iconSelect: false, // 用于判断icon是否有一个被点击
              answerIndex: null,
              content: '是',
              result: {
                content: '',
                dialogContent: '',
                selected: false,
                isShow: false
              },
              relation: {
                content: '',
                selected: false,
                isShow: false
              },
              question: {
                children: {
                  answer: []
                }
              }
            }
            if (answers[i].question.children.answer.length === 0) {
              Object.assign(answers[i].question, {
                id: +new Date(),
                selected: true,
                isShow: true,
                isEdit: false,
                children: {
                  answer: [answer]
                }
              })
            } else {
              answers[i].question.children.answer.push(answer)
            }
            break
          } else {
            num++
            if (num === len) {
              for (let j = 0; j < answers.length; j++) {
                if ('children' in answers[j].question) {
                  this.loopEnter(answers[j].question.children.answer)
                }
              }
            }
          }
        }
      },
      enterKey(event) {
        const key = event.keyCode
        if (key === 13) {
          if (this.questionObj.type === 'answer') {
            this.loopEnter(this.questionObj.answer, 'answer')
          } else if (this.questionObj.type === `question${this.questionObj.index}`) {
            this.loopEnter(this.questionObj.answer, 'question')
          }
        }
      },
      loopDelete(answers, type) {
        let len = answers.length
        let confirm = (tip, fn) => {
          this.$confirm(tip, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            fn()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
            return
          })
        }
        for (let i = 0; i < len; i++) {
          if (type === 'result' || type === 'relationDisease') {
            if (answers[i].result.selected && !this.showDialog) {
              answers[i].result.isShow = false
              // 清空结果内容及弹窗内容
              answers[i].result.content = ''
              answers[i].result.dialogContent = ''
              // 按钮恢复高亮，可点击
              answers[i].iconSelect = false
            } else if (answers[i].relation.selected && !this.showDialog) {
              answers[i].relation.isShow = false
              answers[i].relation.content = ''
              // 按钮恢复高亮，可点击
              answers[i].iconSelect = false
            }
          } else if (type === 'answer') {
            /*
            * iconSelect: 答案后是否有内容
            * selected: 是否被选中
            * isEdit: 是否编辑状态
            * */
            if (answers[i].iconSelect && answers[i].selected && !answers[i].isEdit) {
              confirm('删除该答案将中断相关的关联关系，您是否确认该操作？', () => {
                return answers.splice(i, 1)
              })
            } else if (!answers[i].iconSelect && answers[i].selected && !answers[i].isEdit) {
              answers.splice(i, 1)
              len = answers.length
            }
          } else if (type === 'question') {
            if (answers[i].question.selected && !answers[i].question.isEdit && answers[i].question.children.answer.length > 0) {
              confirm('删除该问题将中断相关的关联关系，您是否确认该操作？', () => {
                answers[i].question = {}
                // 问题前面的答案
                answers[i].iconSelect = false
              })
            } else if (answers[i].question.selected && !answers[i].question.isEdit) {
              answers[i].question = {}
              answers[i].iconSelect = false
            }
          }
        }
      },
      // 删除delete键
      deleteKey(event) {
        const key = event.keyCode
        if (key === 8) {
          if (this.questionObj.type === 'answer') {
            this.loopDelete(this.questionObj.answer, 'answer')
          } else if (this.questionObj.type === `question${this.questionObj.index}`) {
            this.loopDelete(this.questionObj.answer, 'question')
          } else if (this.questionObj.type === `result`) {
            this.loopDelete(this.questionObj.answer, 'result')
          } else if (this.questionObj.type === `relationDisease`) {
            this.loopDelete(this.questionObj.answer, 'relationDisease')
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @mixin card-title($color, $background) {
    display: inline-flex;
    justify-content: space-between;
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

  @mixin icon($background) {
    display: inline-block;
    width: 18px;
    height: 18px;
    transform: scale(0.8);
    background: $background
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

      .answers {
        display: flex;
        flex-direction: column;
        margin-left: 80px;
      }

      .answer-list {
        display: flex;

        .question {
          margin-left: 80px;
        }
      }

      .result-list {
        margin-left: 80px;
      }

      .answer {
        /*flex: 260 0 0;*/
        width: 260px;
        height: 80px;
        border: 1px solid #d9efee;
        cursor: pointer;
        margin-bottom: 100px;

        &:hover {
          border: 1px solid #7fa8d6;
        }

        .title {
          @include card-title(#d0deed, #eef6ff);
          display: flex;
          justify-content: space-between;

          .icon {
            display: flex;
            align-items: center;

            span {
              margin-left: 14px;
            }
          }

        }

        .content {
          padding: 10px 15px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .resultGray-icon {
        @include icon(url('../../icons/svg/resultGray.svg') no-repeat);
      }

      .result-icon {
        @include icon(url('../../icons/svg/result.svg') no-repeat);
      }

      .relation-icon {
        @include icon(url('../../icons/svg/relation.svg') no-repeat);
      }
      .result-detail {
        @include icon(url('../../icons/svg/detail.svg') no-repeat);
      }

      .relationGray-icon {
        @include icon(url('../../icons/svg/relationGray.svg') no-repeat);
      }

      .result, .relation-disease {
        position: relative;
        width: 260px;
        height: 105px;
        border: 1px solid #f7f1e2;
        cursor: pointer;

        .title {
          @include card-title(#f7edd1, #fff6de);
        }

        .select-result {
          margin: 15px;
        }

        .tooltip-dialog-content {
          position: absolute;
          bottom: 20%;
          /*right: 20%;*/
          color: #f47920;
        }
      }

      .result:hover {
        border: 1px solid #fbdc8b;
      }

      .relation-disease:hover {
        border: 1px solid #f9bc8f;
      }
    }
  }
</style>
<style lang="scss">
  .flow-chart-result-dialog {
    .el-dialog .el-dialog__header {
      padding: 15px;
    }
  }
  .flow-chart {
    .el-input.question-input {
      .el-input__inner {
        border: 0;
      }
    }
  }
</style>