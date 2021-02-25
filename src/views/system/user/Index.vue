<template>
  <div class="system-user">

    <!--  查询参数  -->
    <div class="search text-center">
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

    <!--  工具栏  -->
    <div class="tools flex-space-between flex-align-center">
      <div class="tools-btn">
        <el-button icon="el-icon-plus" type="primary" size="small" @click="addUserInfo">新增</el-button>
      </div>
      <div class="tools-opera">
        <el-button type="primary" circle><i class="el-icon-refresh"/></el-button>
        <el-button type="primary" circle><i class="el-icon-menu"/></el-button>
      </div>
    </div>

    <!--  用户表格  -->
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
        <el-table-column
          fixed="right"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="watchUserInfo(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="editUserInfo(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--  分页  -->
    <div class="pagination flex-justify-end m-t-15">
      <el-pagination
        v-show="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>

    <!--  用户信息  -->
    <el-dialog
      :title="
        operaStatus === 'add' ? '新增用户' :
        operaStatus === 'edit' ? '修改用户' : '用户信息'"
      :visible.sync="userDialog.visible"
      width="600px">
      <SystemUserInfo
        :propData="userDialog.data"
        @confirm="confirmUserInfo"
        @cancel="userDialog.visible = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import SystemUserInfo from './component/SystemUserInfo'

export default {
  components: { SystemUserInfo },
  data () {
    return {
      operaStatus: '', // 当前操作状态（'add'、'edit'、'watch'）
      search: {
        loginName: ''
      },
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: null
      },
      userDialog: {
        visible: false,
        data: {}
      },
      tableData: [],
      tableLoading: false
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
    addUserInfo () {
      this.operaStatus = 'add'
      this.userDialog.visible = true
      this.userDialog.data = { _status: this.operaStatus }
    },
    watchUserInfo (row) {
      this.operaStatus = 'watch'
      this.userDialog.visible = true
      this.userDialog.data = this._.merge(
        { _status: this.operaStatus },
        this._.cloneDeep(row)
      )
    },
    editUserInfo (row) {
      this.operaStatus = 'edit'
      this.userDialog.visible = true
      this.userDialog.data = this._.merge(
        { _status: this.operaStatus },
        this._.cloneDeep(row)
      )
    },
    confirmUserInfo (formData) {
      console.log(formData)
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
