/**
* LGF权限校验
* author: yuxin
* createtime: 2022-02-16
* All rights reserved.
*/
<template>
  <div class="lgf-expression">
    <el-input v-model="lgfExpression" placeholder="请输入LGF表达式"></el-input>
    <!--    {{ stack }}-->
    <el-button type="primary" class="m-t-15" @click="vali">校验</el-button>
  </div>
</template>

<script>
export default {
  name: 'lgf-expression',
  data() {
    return {
      lgfExpression: '', // lgf表达式
      stack: [], // 定义一个栈，记录表达式特殊符号
      specialSymbol: [ // 特殊符号，用于校验
        {
          name: '[',
          mate: ']'
        }, {
          name: '(',
          mate: ')'
        }, {
          name: '.{',
          mate: '}'
        }, {
          name: '|'
        }, {
          name: ' '
        }
      ]
    }
  },
  methods: {
    reset() {
      this.stack = []
    },
    vali() {
      this.reset()
      const vm = this
      if (this.lgfExpression) {
        const lgfExpressionCharList = this.divideIntoCharList()
        for (let i = 0; i < lgfExpressionCharList.length; i++) {
          const inSymbol = lgfExpressionCharList[i]
          const { symbol: symbolName, i: symbolIndex } = this.getStackSymbol()

          // 判断|
          if (inSymbol === '|') {
            if (i > 0 &&
              i !== lgfExpressionCharList.length - 1 &&
              !vm.belongSpecialSymbol(lgfExpressionCharList[i - 1]) &&
              !vm.belongSpecialSymbol(lgfExpressionCharList[i + 1])) {
            } else {
              vm.pushStackSymbol(inSymbol, i)
              break
            }
          }

          if (symbolName) {
            // 判断symbol是否关闭
            if (vm.getSpecialSymbolMate(symbolName) === inSymbol) {
              if (i > symbolIndex + 1) {
                vm.popStackSymbol()
              }
            } else {
              vm.pushStackSymbol(inSymbol, i, true)
            }
          } else {
            vm.pushStackSymbol(inSymbol, i, true)
          }
        }

        vm.getResult()
      }
    },
    judgeMultiChar() {
      let pass = true
      const lgfList = this.lgfExpression.match(/(\.{.*?})/g)
      if (lgfList && lgfList.length !== 0) {
        for (let i = 0; i < lgfList.length; i++) {
          const lgf = lgfList[i]
          // 获取.{xxx}中xxx
          const multiChar = lgf.match(/\.{(\S*)}/)
          const multiCharContent = multiChar ? multiChar[1] : ''
          const judge1 = multiCharContent.split(',')
          // console.log(judge1.length !== 2)
          // console.log(isNaN(judge1[0]))
          // console.log(isNaN(judge1[1]))
          // console.log(parseInt(judge1[0]) < 0)
          // console.log(parseInt(judge1[0]) > parseInt(judge1[1]))
          if (
            judge1.length !== 2 ||
            isNaN(judge1[0]) ||
            isNaN(judge1[1]) ||
            parseInt(judge1[0]) < 0 ||
            parseInt(judge1[0]) > parseInt(judge1[1])
          ) {
            this.$message({
              message: `${lgf}中格式有误，请检查`,
              type: 'error'
            })
            pass = false
          }
        }
      }
      return pass
    },
    /**
     * 分割为理想的char数组
     */
    divideIntoCharList() {
      return this.lgfExpression
        // 先按照.{分组
        .split(/(\.{)/)
        .filter(lgf => lgf !== '' && lgf !== undefined && lgf !== null)
        .reduce((pre, cur) => {
          if (cur !== '.{') {
            pre = [...pre, ...cur]
          } else {
            pre = [...pre, cur]
          }
          return pre
        }, [])
    },
    getResult() {
      if (this.stack.length !== 0) {
        const symbol = this.getStackSymbol()
        this.$message({
          message: `语法错误：符号"${symbol.symbol}"处错误`,
          type: 'error'
        })
        // 判断.{数字，数字}情况
      } else if (this.judgeMultiChar()) {
        this.$message({
          message: '校验成功',
          type: 'success'
        })
      }
    },
    /**
     * 判断是否属于特殊字符
     * @isMate true -- 只判断含有mate属性的特殊字符
     */
    belongSpecialSymbol(char, isMate = false) {
      return this.specialSymbol
        .filter(symbol => isMate ? symbol.mate : true)
        .some(symbol => symbol.name === char || symbol.mate === char)
    },
    /**
     * 获取特殊字符的mate值
     */
    getSpecialSymbolMate(name) {
      const ss = this.specialSymbol.find(symbol => symbol.name === name)
      return ss ? ss.mate : null
    },
    /**
     * 弹出栈顶端一个元素
     */
    popStackSymbol() {
      if (this.stack.length !== 0) {
        return this.stack.pop()
      } else {
        return {}
      }
    },
    /**
     * 获取栈顶端元素
     */
    getStackSymbol() {
      if (this.stack.length !== 0) {
        return this.stack[this.stack.length - 1]
      } else {
        return {}
      }
    },
    /**
     * 往栈中推入一个符号
     * @isMate true -- 只推入含有mate属性的特殊字符
     */
    pushStackSymbol(symbol, i, isMate = false) {
      const judge = this.belongSpecialSymbol(symbol, isMate)
      if (judge) {
        this.stack.push({ symbol, i })
      }
    }
  }
}
</script>

<style scoped>

</style>
