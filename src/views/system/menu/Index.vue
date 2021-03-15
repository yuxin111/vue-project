<template>
  <div class="system-menu">

    <!--  查询参数  -->
    <div class="search text-center">
      <el-form :model="search" label-width="80px" inline>
        <el-form-item label="角色名称">
          <el-input v-model="search.menuName" placeholder="请输入角色名称" size="small" clearable></el-input>
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
          <el-button type="primary" icon="el-icon-search" size="mini" @click="queryMenuList">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--  工具栏  -->
    <div class="tools flex-space-between flex-align-center">
      <div class="tools-btn">
        <el-button icon="el-icon-plus" type="primary" size="small" plain @click="addMenuInfo">新增</el-button>
      </div>
      <div class="tools-opera">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button type="primary" size="small" circle><i class="el-icon-refresh"/></el-button>
        </el-tooltip>
        <el-dropdown class="m-l-10" :hide-on-click="false">
          <el-button type="primary" size="small" circle><i class="el-icon-menu"/></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(tc,i) in tableColumn" :key="i">
              <el-checkbox v-model="tc.show">{{ tc.label }}</el-checkbox>
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
        row-key="menuId"
        default-expand-all
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          sortable>
        </el-table-column>
        <el-table-column
          prop="address">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleMenuInfo('watch',scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="handleMenuInfo('edit',scope.row)">编辑</el-button>
            <el-popconfirm
              title="是否删除该角色信息？"
              icon="el-icon-info"
              icon-color="red"
              placement="top"
              @confirm="deleteMenuInfo(scope.row)"
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
      :visible.sync="menuDialog.visible"
      :close-on-click-modal="false"
      width="600px">
      <SystemMenuInfo
        :propData="menuDialog.data"
        :confirmLoading="menuDialog.confirmLoading"
        @confirm="confirmMenuInfo"
        @cancel="menuDialog.visible = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import tableColumn from './tableColumn'
import SystemMenuInfo from './component/SystemMenuInfo'
import { mapGetters } from 'vuex'

export default {
  components: { SystemMenuInfo },
  data () {
    return {
      tableColumn, // 表格字段数据
      operaStatus: '', // 当前操作状态（'add'、'edit'、'watch'）
      search: {
        menuName: '',
        code: '',
        status: null
      },
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: null
      },
      menuDialog: {
        visible: false,
        confirmLoading: false,
        data: {}
      },
      tableData: [{
        menuId: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        menuId: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        menuId: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          menuId: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          menuId: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        menuId: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableData1: [{
        menuId: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        menuId: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        menuId: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        hasChildren: true
      }, {
        menuId: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableLoading: false
    }
  },
  mounted () {
    // this.getMenuList()
  },
  methods: {
    getMenuList () {
      const params = {
        menuName: this.search.menuName,
        code: this.search.code,
        status: this.search.status
      }
      this.tableLoading = true
      this.$api.system.getMenuList(this.pagination, params)
        .then(res => {
          this.pagination.total = res.total
          this.tableData = res.data
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    queryMenuList () {
      this.getMenuList()
    },
    addMenuInfo () {
      this.operaStatus = 'add'
      this.menuDialog.visible = true
      this.menuDialog.data = {
        _status: this.operaStatus,
        status: 1
      }
    },
    handleMenuInfo (operaStatus, row) {
      this.operaStatus = operaStatus
      this.menuDialog.visible = true
      this.menuDialog.data = this._.merge(
        { _status: this.operaStatus },
        this._.cloneDeep(row)
      )
    },
    deleteMenuInfo (row) {
      this.$api.system.deleteMenu(row.menuId)
        .then(() => {
          this.$message({
            message: '删除角色信息成功',
            type: 'success'
          })
          this.handleCurrentChange(1)
        })
    },
    confirmMenuInfo (formData) {
      const params = {
        ...formData,
        createBy: formData._status === 'add' ? this.userInfo.username : formData.createBy,
        updateBy: formData._status === 'edit' ? this.userInfo.username : formData.updateBy
      }
      const apiName = formData._status === 'add' ? 'addMenu' : 'updateMenu'
      this.menuDialog.confirmLoading = true
      this.$api.system[apiName](params)
        .then(res => {
          this.$message({
            message: '保存角色信息成功',
            type: 'success'
          })
          this.menuDialog.visible = false
          this.handleCurrentChange(1)
        })
        .finally(() => {
          this.menuDialog.confirmLoading = false
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
        this.confirmMenuInfo(row)
      }).catch(() => {
        row.status = 1 ^ status
      })
    },
    refresh () {
      this.resetSearch()
      this.queryMenuList()
    },
    resetSearch () {
      this.search.menuName = ''
      this.search.code = ''
      this.search.status = null
    },
    handleSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.pageNum = 1
      this.queryMenuList()
    },
    handleCurrentChange (pageNum) {
      this.pagination.pageNum = pageNum
      this.queryMenuList()
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
