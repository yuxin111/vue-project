<template>
  <div class="system-user">
    <div class="search">
      <el-form :model="search" label-width="80px" inline>
        <el-form-item label="登录账号">
          <el-input v-model="search.loginName" placeholder="请输入登录账号" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini">重置</el-button>
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
        :data="tableMain"
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
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
      tableMain: [],
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange () {

    },
    handleCurrentChange () {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
