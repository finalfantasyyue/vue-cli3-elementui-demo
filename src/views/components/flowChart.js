import {jsPlumb} from 'jsplumb'
export default {
  data() {
    return {
      isShowAnswerContentTooltip: true, // 默认不显示答案的tooltip
    }
  },
  mounted() {
    // 点击任何区域保存输入内容
    const _this = this
    document.addEventListener('click',function(e) {
      if (e.target.nodeName !== 'use' && !e.target.parentNode.className.includes('question-input')) {
        _this.questionObj.isEdit = false
        let cancelEdit = (answers) => {
          if (answers.length > 0) {
            let len = answers.length
            let num = 0
            for (let i = 0; i < len; i++) {
              answers[i].isEdit = false
              answers[i].question.isEdit = false
              num ++
              if (num === len) {
                if ('children' in answers[i].question) {
                  cancelEdit(answers[i].question.children.answer)
                }
              }
            }
          }
        }
        cancelEdit(_this.questionObj.answer)
      }
    })
  },
  methods: {
    createFlow(flowData) {
      let instance = jsPlumb.getInstance()
      console.log(instance);
      // jsPlumb.connect({
      //   source: this.questionObj.id,
      //   target: this.questionObj.answer[0].id
      // })
    },
    questionType(val) {
      this.questionObj.type = val
    },
    // 取消所有元素选中
    unSelected(answers) {
      let len = answers.length
      for (let i = 0; i < len; i++) {
        answers[i].selected = false
        answers[i].result.selected = false
        answers[i].relation.selected = false
        if ('children' in answers[i].question) {
          answers[i].question.selected = false
          this.unSelected(answers[i].question.children.answer)
        }
      }
    },
    // 递归获取选中的数据
    loopSelect(answers, index, data, type) {
      // debugger
      let len = answers.length
      let num = 0
      for (let i = 0; i < len; i++) {
        if (answers[i].id === data.id) {
          this.unSelected(this.rootAnswer)
          this.questionObj.index = i
          answers[i].answerIndex = index
          if (type === 'answer') {
            answers[i].selected = true
          } else if (type === `question${index}`) {
            answers[i].question.selected = true
          } else if (type === 'result') {
            answers[i].result.selected = true
          } else if (type === 'relationDisease') {
            answers[i].relation.selected = true
          }
        } else {
          num++
          answers[i].selected = false
          if (num === len) {
            this.loopSelect(answers[index].question.children)
          }
          continue
        }
      }
    },
    // 选择选项卡
    selectCard(type, index, data) {
      switch (type) {
        case 'question':
          this.questionObj.type = 'question'
          this.questionObj.borderColor = '#00baab'
          this.unSelected(data.answer)
          break
        case 'answer':
          this.questionObj.type = 'answer'
          this.questionObj.borderColor = '#0052ad'
          this.$emit('type', 'answer') // 更新第一个问题type, 取消选中状态
          this.loopSelect(this.questionObj.answer, index, data, type)
          break
        case 'result':
          this.questionObj.type = 'result'
          this.questionObj.borderColor = '#f8ba17'
          this.$emit('type', 'result') // 更新第一个问题type, 取消选中状态
          this.loopSelect(this.questionObj.answer, index, data, type)
          break
        case 'relationDisease':
          this.questionObj.type = 'relationDisease'
          this.questionObj.borderColor = '#f47920'
          this.$emit('type', 'relationDisease') // 更新第一个问题type, 取消选中状态
          this.loopSelect(this.questionObj.answer, index, data, type)
          break
        case `question${index}`:
          this.questionObj.type = `question${index}`
          this.questionObj.borderColor = '#00baab'
          this.$emit('type', `question${index}`) // 更新第一个问题type
          this.loopSelect(this.questionObj.answer, index, data, type)
          break
        default:
          this.questionObj.borderColor = ''
      }
    },
    // 双击
    editInput(e, type, index, data) {
      if (type === 'question') {
        this.questionObj.isEdit = true
        this.$nextTick(() => {
          this.$refs.questionInput.focus()
        })
      } else if (type === 'answer') {
        this.questionObj.answer[index].isEdit = true
        this.$nextTick(() => {
          this.$refs[data.id][0].focus()
        })
      } else if (type === `question${index}`) {
        data.question.isEdit = true
        this.$nextTick(() => {
          this.$refs[`question${index}`][0].focus()
        })
      }
    },
    answerEnter() {

    },
    // 答案icon
    selectIcon(index, type) {
      this.questionObj.answer.forEach((item, i) => {
        // 点击结果icon
        if (!item.result.isShow && type === 'result') {
          if (i === index && !item.iconSelect) {
            item.iconSelect = true
            item.result.isShow = true
          }
        }
        // 点击关联疾病icon
        if (!item.relation.isShow && type === 'relationDisease') {
          if (i === index && !item.iconSelect) {
            item.iconSelect = true
            item.relation.isShow = true
          }
        }
      })
    }
  }
}