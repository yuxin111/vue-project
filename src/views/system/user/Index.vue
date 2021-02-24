<template>
  <div class="system-user">
    <div class="search">
      <el-form :model="search" label-width="80px" inline>
        <el-form-item label="登录账号">
          <el-input v-model="search.loginName" placeholder="请输入登录账号" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="queryUserList">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tools flex-space-between flex-align-center">
      <div class="tools-btn">
        <el-button icon="el-icon-plus" type="primary" size="small">新增</el-button>
      </div>
      <div class="tools-opera">
        <el-button type="primary" circle><i class="el-icon-refresh"/></el-button>
        <el-button type="primary" circle><i class="el-icon-menu"/></el-button>
      </div>
    </div>
    <div class="table m-t-15">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="loginName"
          label="登录账号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination flex-justify-end m-t-15">
      <el-pagination
        v-show="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNum"
        :page-sizes="[1, 10, 20, 50]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: {
        loginName: ''
      },
      pagination: {
        pageSize: 1,
        pageNum: 1,
        total: null
      },
      tableData: [],
      tableLoading: false,
      currentPage: 1
    }
  },
  mounted () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      const params = {
        loginName: this.search.loginName
      }
      this.tableLoading = true
      this.$api.system.getUserList(this.pagination, params)
        .then(res => {
          this.pagination.total = res.total
          this.tableData = res.data
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    queryUserList () {
      this.getUserList()
    },
    resetSearch () {
      this.search.loginName = ''
    },
    handleSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.pageNum = 1
      this.queryUserList()
    },
    handleCurrentChange (pageNum) {
      this.pagination.pageNum = pageNum
      this.queryUserList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
