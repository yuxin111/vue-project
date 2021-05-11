<template>
  <div class="oper-log">

    <!--  查询参数  -->
    <div class="search text-center">
      <el-form :model="search" label-width="80px" inline>
        <el-form-item label="操作">
          <el-input v-model="search.operLog" placeholder="请输入操作" size="small"></el-input>
        </el-form-item>
        <el-form-item label="返回结果">
          <el-select v-model="search.status" placeholder="请选择返回结果" size="small" clearable>
            <el-option label="成功" :value="1"></el-option>
            <el-option label="失败" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input v-model="search.loginName" placeholder="请输入操作人" size="small"></el-input>
        </el-form-item>
        <el-form-item label="操作时间">
          <date-time v-model="search.operDateTime"></date-time>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="queryOperLogList">搜索</el-button>
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
              {{ scope.row[tc.prop] === 0 ? '失败' : scope.row[tc.prop] === 1 ? '成功' : '' }}
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
import DateTime from '@/components/DateTime'
import tableColumn from './tableColumn'
import SystemOperLogInfo from './component/SystemOperLogInfo'
import { mapGetters } from 'vuex'

export default {
  mixins: [permission],
  components: {
    SystemOperLogInfo,
    DateTime
  },
  data () {
    return {
      tableColumn, // 表格字段数据
      operaStatus: '', // 当前操作状态（'add'、'edit'、'watch'）
      search: {
        operLog: '',
        loginName: '',
        status: '',
        operDateTime: []
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
      const [createBeginTime, createEndTime] = this.search.operDateTime
      const params = {
        operLog: this.search.operLog,
        loginName: this.search.loginName,
        status: this.search.status,
        createBeginTime,
        createEndTime
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
    queryOperLogList () {
      this.pagination.pageNum = 1
      this.getOperLogList()
    },
    async handleOperLogInfo (operaStatus, row) {
      const operLog = await this.getOperLogById(row.operLogId)
      this.operaStatus = operaStatus
      this.operLogDialog.visible = true
      this.operLogDialog.data = this._.merge(
        { _status: this.operaStatus },
        this._.cloneDeep(operLog)
      )
    },
    refresh () {
      this.resetSearch()
      this.queryOperLogList()
    },
    resetSearch () {
      this.search.operLog = ''
      this.search.loginName = ''
      this.search.status = ''
      this.search.operDateTime = []
    },
    handleSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.pageNum = 1
      this.getOperLogList()
    },
    handleCurrentChange (pageNum) {
      this.pagination.pageNum = pageNum
      this.getOperLogList()
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
