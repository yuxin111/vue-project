<template>
  <div class="system-role">

    <!--  查询参数  -->
    <div class="search text-center">
      <el-form :model="search" label-width="80px" inline>
        <el-form-item label="角色名称">
          <el-input v-model="search.roleName" placeholder="请输入角色名称" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色代码">
          <el-input v-model="search.code" placeholder="请输入角色代码" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select v-model="search.status" placeholder="请选择角色状态" size="small" clearable>
            <el-option label="正常" :value="1"></el-option>
            <el-option label="停用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="queryRoleList">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--  工具栏  -->
    <div class="tools flex-space-between flex-align-center">
      <div class="tools-btn">
        <el-button icon="el-icon-plus" type="primary" size="small" plain @click="addRoleInfo">新增</el-button>
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

    <!--  角色表格  -->
    <div class="table m-t-15">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          v-for="(tc,i) in tableColumnShown"
          :key="i"
          :label="tc.label"
          align="center">
          <template slot-scope="scope">
            <!-- 状态 -->
            <template v-if="tc.prop === 'status'">
              <el-switch
                v-model="scope.row[tc.prop]"
                :active-value="1"
                :inactive-value="0"
                @change="changeStatus($event,scope.row)">
              </el-switch>
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
            <el-button type="text" size="small" @click="handleRoleInfo('watch',scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="handleRoleInfo('edit',scope.row)">编辑</el-button>
            <el-popconfirm
              title="是否删除该角色信息？"
              icon="el-icon-info"
              icon-color="red"
              placement="top"
              @confirm="deleteRoleInfo(scope.row)"
            >
              <el-button type="text" size="small" slot="reference" class="m-l-10">删除</el-button>
            </el-popconfirm>
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

    <!--  角色信息dialog  -->
    <el-dialog
      :title="
        operaStatus === 'add' ? '新增角色' :
        operaStatus === 'edit' ? '修改角色' : '角色信息'"
      :visible.sync="roleDialog.visible"
      :close-on-click-modal="false"
      width="600px">
      <SystemRoleInfo
        :propData="roleDialog.data"
        :confirmLoading="roleDialog.confirmLoading"
        :visible="roleDialog.visible"
        @confirm="confirmRoleInfo"
        @cancel="roleDialog.visible = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import tableColumn from './tableColumn'
import SystemRoleInfo from './component/SystemRoleInfo'
import { mapGetters } from 'vuex'

export default {
  components: { SystemRoleInfo },
  data () {
    return {
      tableColumn, // 表格字段数据
      operaStatus: '', // 当前操作状态（'add'、'edit'、'watch'）
      search: {
        roleName: '',
        code: '',
        status: null
      },
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: null
      },
      roleDialog: {
        visible: false,
        confirmLoading: false,
        data: {}
      },
      tableData: [],
      tableLoading: false
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    getRoleList () {
      const params = {
        roleName: this.search.roleName,
        code: this.search.code,
        status: this.search.status
      }
      this.tableLoading = true
      this.$api.system.getRoleList({
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
    getRoleById (id) {
      return new Promise(resolve => {
        this.$api.system.getRoleById(id)
          .then(res => {
            res.menuIds = res.menus.map(menu => menu.menuId)
            resolve(res)
          })
      })
    },
    queryRoleList () {
      this.getRoleList()
    },
    addRoleInfo () {
      this.operaStatus = 'add'
      this.roleDialog.visible = true
      this.roleDialog.data = {
        _status: this.operaStatus,
        status: 1,
        menuIds: []
      }
    },
    async handleRoleInfo (operaStatus, row) {
      const roleInfo = await this.getRoleById(row.roleId)
      this.operaStatus = operaStatus
      this.roleDialog.visible = true
      this.roleDialog.data = this._.merge(
        { _status: this.operaStatus },
        this._.cloneDeep(roleInfo)
      )
    },
    deleteRoleInfo (row) {
      this.$api.system.deleteRole(row.roleId)
        .then(() => {
          this.$message({
            message: '删除角色信息成功',
            type: 'success'
          })
          this.handleCurrentChange(1)
        })
    },
    confirmRoleInfo (formData) {
      const params = {
        ...formData,
        createBy: formData._status === 'add' ? this.userInfo.username : formData.createBy,
        updateBy: formData._status === 'edit' ? this.userInfo.username : formData.updateBy
      }
      const apiName = formData._status === 'add' ? 'addRole' : 'updateRole'
      this.roleDialog.confirmLoading = true
      this.$api.system[apiName](params)
        .then(res => {
          this.$message({
            message: '保存角色信息成功',
            type: 'success'
          })
          this.roleDialog.visible = false
          this.handleCurrentChange(1)
        })
        .finally(() => {
          this.roleDialog.confirmLoading = false
        })
    },
    changeStatus (status, row) {
      const tip = status === 1 ? '是否启用该角色？' : '是否停用该角色？'
      this.$confirm(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.operaStatus = 'edit'
        row = this._.merge(
          { _status: this.operaStatus },
          this._.cloneDeep(row)
        )
        this.confirmRoleInfo(row)
      }).catch(() => {
        row.status = 1 ^ status
      })
    },
    refresh () {
      this.resetSearch()
      this.queryRoleList()
    },
    resetSearch () {
      this.search.roleName = ''
      this.search.code = ''
      this.search.status = null
    },
    handleSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.pageNum = 1
      this.queryRoleList()
    },
    handleCurrentChange (pageNum) {
      this.pagination.pageNum = pageNum
      this.queryRoleList()
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
