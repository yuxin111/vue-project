<template>
  <div class="single-input-table">
    <el-input placeholder="请输入复合表达式.." v-model="input" class="input-with-select" @keyup.enter.native="search">
      <el-button slot="append" type="primary" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <!--  测试表格  -->
    <div class="table m-t-15">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          v-for="(tc,i) in tableColumnShown"
          :key="i"
          :prop="tc.prop"
          :label="tc.label"
          align="center">
          <template slot-scope="scope">
            {{ scope.row[tc.prop] }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import tableColumn from './tableColumn'

export default {
  name: 'single-input-table',
  data() {
    return {
      tableColumn, // 表格字段数据
      tableData: [],
      tableLoading: false,
      input: '姓名：yuxin & 手机号：1234 & （轮次/外呼次数） >> 轮次率' // 输入框
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    search() {
      const params = this.dealInput()
      this.$api.singleInputTable.getSingleInputTableList({
        pageSize: 100,
        pageNum: 1
      }, params)
        .then(res => {
          const data = res.data
          this.tableData = data
        })
    },
    /**
     * 处理复合查询表达式
     */
    dealInput() {
      const input = this.input
      const expressList = input.split(' & ')
      const singleInput = {}
      const singleInputSearch = {}
      for (let i = 0; i < expressList.length; i++) {
        const express = expressList[i]
        // 普通查询模块处理
        if (this.isSingleInputSearch(express)) {
          const normalSplit = express.split(/:|：/)
          let [normalName, normalValue] = normalSplit
          if (normalName && normalValue) {
            normalName = normalName.trim()
            normalValue = normalValue.trim()
            const tc = tableColumn.find(tc => tc.label === normalName)
            if (tc) {
              singleInputSearch[tc.prop] = normalValue
            } else {
              this.$message({
                message: '请输入正确的筛选字段名',
                type: 'warning'
              })
              break
            }
          } else {
            this.$message({
              message: '请输入筛选字段与筛选值',
              type: 'warning'
            })
            break
          }
        }
        if (this.isOutputSearch(express)) {

        }
      }
      singleInput.singleInputSearch = singleInputSearch
      return singleInput
    },
    // 判断是否为普通查询模块
    isSingleInputSearch(express) {
      if (/:|：/.test(express)) {
        return true
      }
      return false
    },
    // 判断是否为字段输出模块
    isOutputSearch(express) {
      if (/>>|》》/.test(express)) {
        return true
      }
      return false
    }
  },
  computed: {
    tableColumnShown() {
      return this.tableColumn.filter(tc => tc.show)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
