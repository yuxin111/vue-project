<template>
  <div class="oper-log">

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
      </div>
      <div class="tools-opera">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button type="primary" size="small" circle><i class="el-icon-refresh"/></el-button>
        </el-tooltip>
        <el-dropdown class="m-l-10" :hide-on-click="false">
          <el-button type="primary" size="small" circle><i class="el-icon-menu"/></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(tc,i) in tableColumn" :key="i">
              <el-checkbox v-model="tc.show" :disabled="!tc.editable">{{ tc.label }}</el-checkbox>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!--  操作日志表格  -->
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
            <!-- 状态 -->
            <template v-if="tc.prop === 'status'">
              {{scope.row[tc.prop] === 0 ? '失败' : scope.row[tc.prop]  === 1 ? '成功' : ''}}
            </template>
            <!-- 其他属性 -->
            <template v-else>
              {{ scope.row[tc.prop] }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small"
                       :disabled="!$_hasPermission('log:operLog:watch')"
                       @click="handleOperLogInfo('watch',scope.row)">查看
            </el-button>
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

    <!--  操作日志信息dialog  -->
    <el-dialog
      title=""
      :visible.sync="operLogDialog.visible"
      width="700px">
      <SystemOperLogInfo
        :propData="operLogDialog.data"
        :confirmLoading="operLogDialog.confirmLoading"
        :visible="operLogDialog.visible"
        @cancel="operLogDialog.visible = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/utils/mixin/permission'
import tableColumn from './tableColumn'
import SystemOperLogInfo from './component/SystemOperLogInfo'
import { mapGetters } from 'vuex'

export default {
  mixins: [permission],
  components: { SystemOperLogInfo },
  data () {
    return {
      tableColumn, // 表格字段数据
      operaStatus: '', // 当前操作状态（'add'、'edit'、'watch'）
      search: {
        loginName: ''
      },
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: null
      },
      operLogDialog: {
        visible: false,
        confirmLoading: false,
        data: {}
      },
      tableData: [],
      tableLoading: false
    }
  },
  mounted () {
    this.getOperLogList()
  },
  methods: {
    getOperLogList () {
      const params = {
        loginName: this.search.loginName
      }
      this.tableLoading = true
      this.$api.log.getOperLogList({
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.pageNum
      }, params)
        .then(res => {
          const data = res.data
          this.pagination.total = res.total
          this.tableData = data
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    getOperLogById (id) {
      return new Promise(resolve => {
        this.$api.log.getOperLogById(id)
          .then(res => {
            // res.roleIds = res.roles.map(role => role.roleId)
            resolve(res)
          })
      })
    },
    queryUserList () {
      this.getOperLogList()
    },
    // addUserInfo () {
    //   this.operaStatus = 'add'
    //   this.operLogDialog.visible = true
    //   this.operLogDialog.data = { _status: this.operaStatus }
    // },
    async handleOperLogInfo (operaStatus, row) {
      const operLog = await this.getOperLogById(row.operLogId)
      this.operaStatus = operaStatus
      this.operLogDialog.visible = true
      this.operLogDialog.data = this._.merge(
        { _status: this.operaStatus },
        this._.cloneDeep(operLog)
      )
    },
    // deleteUserInfo (row) {
    //   this.$api.log.deleteUser(row.userId)
    //     .then(() => {
    //       this.$message({
    //         message: '删除操作日志信息成功',
    //         type: 'success'
    //       })
    //       this.handleCurrentChange(1)
    //     })
    // },
    // confirmUserInfo (formData) {
    //   const params = {
    //     ...formData,
    //     createBy: formData._status === 'add' ? this.userInfo.username : formData.createBy,
    //     updateBy: formData._status === 'edit' ? this.userInfo.username : formData.updateBy
    //   }
    //   const apiName = formData._status === 'add' ? 'addUser' : 'updateUser'
    //   this.operLogDialog.confirmLoading = true
    //   this.$api.log[apiName](params)
    //     .then(res => {
    //       this.$message({
    //         message: '保存操作日志信息成功',
    //         type: 'success'
    //       })
    //       this.operLogDialog.visible = false
    //       this.handleCurrentChange(1)
    //     })
    //     .finally(() => {
    //       this.operLogDialog.confirmLoading = false
    //     })
    // },
    refresh () {
      this.resetSearch()
      this.queryUserList()
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
  },
  computed: {
    ...mapGetters({
      userInfo: 'User/userInfo'
    }),
    tableColumnShown () {
      return this.tableColumn.filter(tc => tc.show)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
