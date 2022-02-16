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
        const lgfExpressionCharList = vm.lgfExpression.split('')
        for (let i = 0; i < lgfExpressionCharList.length; i++) {
          const inSymbol = lgfExpressionCharList[i]
          const { symbol: symbolName, i: symbolIndex } = vm.getStackSymbol()

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
    getResult() {
      if (this.stack.length !== 0) {
        const symbol = this.getStackSymbol()
        this.$message({
          message: `语法错误：符号"${symbol.symbol}"处错误`,
          type: 'error'
        })
      } else {
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
