<template>
  <div class="system-menu">

    <!--  查询参数  -->
    <div class="search text-center">
      <el-form :model="search" label-width="80px" inline>
        <el-form-item label="菜单名称">
          <el-input v-model="search.menuName" placeholder="请输入菜单名称" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="菜单标识">
          <el-input v-model="search.code" placeholder="请输入菜单标识" size="small" clearable></el-input>
        </el-form-item>
        <!--        <el-form-item label="菜单状态">-->
        <!--          <el-select v-model="search.status" placeholder="请选择菜单状态" size="small" clearable>-->
        <!--            <el-option label="正常" :value="1"></el-option>-->
        <!--            <el-option label="停用" :value="0"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" v-icon-shake @click="queryMenuList">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" v-icon-rotate @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--  工具栏  -->
    <div class="tools flex-space-between flex-align-center">
      <div class="tools-btn">
        <el-button icon="el-icon-plus" type="primary" size="small" plain
                   :disabled="!$_hasPermission('system:menu:add')"
                   @click="addMenuInfo">新增
        </el-button>
      </div>
      <div class="tools-opera">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button type="primary" size="small" circle v-icon-rotate><i class="el-icon-refresh"/></el-button>
        </el-tooltip>
        <el-dropdown class="m-l-10" :hide-on-click="false">
          <el-button type="primary" size="small" circle><i class="el-icon-menu"/></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(tc,i) in tableColumn" :key="i">
              <el-checkbox v-model="tc.show" :disabled="!tc.editable">{{ tc.label }}</el-checkbox>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tooltip class="item m-l-10" effect="dark" content="全部展开/收缩" placement="top">
          <el-button type="primary" size="small" circle v-icon-rotate @click="toggleTableExpand"><i class="el-icon-sort"/></el-button>
        </el-tooltip>
      </div>
    </div>

    <!--  菜单表格  -->
    <div class="table m-t-15">
      <el-table
        ref="table"
        v-loading="tableLoading"
        :data="tableData"
        row-key="menuId"
        style="width: 100%">
        <el-table-column
          v-for="(tc,i) in tableColumnShown"
          :key="i"
          :label="tc.label">
          <template slot-scope="scope">
            <template>
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
                       :disabled="!$_hasPermission('system:menu:add')"
                       @click="addMenuInfo({parentId: scope.row.menuId})">新增
            </el-button>
            <el-button type="text" size="small"
                       :disabled="!$_hasPermission('system:menu:watch')"
                       @click="handleMenuInfo('watch',scope.row)">查看
            </el-button>
            <el-button type="text" size="small"
                       :disabled="!$_hasPermission('system:menu:edit')"
                       @click="handleMenuInfo('edit',scope.row)">编辑
            </el-button>
            <el-popconfirm
              title="是否删除该菜单？"
              icon="el-icon-info"
              icon-color="red"
              placement="top"
              @confirm="deleteMenuInfo(scope.row)"
            >
              <el-button type="text" size="small" slot="reference" class="m-l-10"
                         :disabled="!$_hasPermission('system:menu:delete')">删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--  分页  -->
    <!--    <div class="pagination flex-justify-end m-t-15">-->
    <!--      <el-pagination-->
    <!--        v-show="pagination.total"-->
    <!--        @size-change="handleSizeChange"-->
    <!--        @current-change="handleCurrentChange"-->
    <!--        :current-page="pagination.pageNum"-->
    <!--        :page-sizes="[5, 10, 20, 50]"-->
    <!--        :page-size="pagination.pageSize"-->
    <!--        layout="total, sizes, prev, pager, next, jumper"-->
    <!--        :total="pagination.total">-->
    <!--      </el-pagination>-->
    <!--    </div>-->

    <!--  菜单dialog  -->
    <el-dialog
      :title="
        operaStatus === 'add' ? '新增菜单' :
        operaStatus === 'edit' ? '修改菜单' : '菜单'"
      :visible.sync="menuDialog.visible"
      :close-on-click-modal="false"
      width="600px">
      <SystemMenuInfo
        :propData="menuDialog.data"
        :confirmLoading="menuDialog.confirmLoading"
        :visible="menuDialog.visible"
        @confirm="confirmMenuInfo"
        @cancel="menuDialog.visible = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/utils/mixin/permission'
import { formatToTree } from '@/utils/common'
import tableColumn from './tableColumn'
import SystemMenuInfo from './component/SystemMenuInfo'
import { mapGetters } from 'vuex'

export default {
  mixins: [permission],
  components: { SystemMenuInfo },
  data () {
    return {
      tableColumn, // 表格字段数据
      operaStatus: '', // 当前操作状态（'add'、'edit'、'watch'）
      search: {
        menuName: '',
        status: null
      },
      // pagination: {
      //   pageSize: 10,
      //   pageNum: 1,
      //   total: null
      // },
      menuDialog: {
        visible: false,
        confirmLoading: false,
        data: {}
      },
      tableData: [],
      tableLoading: false,
      tableExpand: false
    }
  },
  mounted () {
    this.getMenuList()
  },
  methods: {
    toggleTableExpand () {
      this.tableExpand = !this.tableExpand
    },
    getMenuList () {
      const params = {
        menuName: this.search.menuName,
        code: this.search.code
      }
      this.tableLoading = true
      this.$api.system.getMenuList(params)
        .then(res => {
          this.tableData = !params.menuName && !params.code
            ? formatToTree(res, 'menuId', 'parentId', 'children')
            : res
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    queryMenuList () {
      // this.pagination.pageNum = 1
      this.getMenuList()
    },
    addMenuInfo (params) {
      this.operaStatus = 'add'
      this.menuDialog.visible = true
      this.menuDialog.data = {
        _status: this.operaStatus,
        status: 1,
        ...params
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
            message: '删除菜单成功',
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
            message: '保存菜单成功',
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
      const tip = status === 1 ? '是否启用该菜单？' : '是否停用该菜单？'
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
      this.search.status = null
    }
    // handleSizeChange (pageSize) {
    //   this.pagination.pageSize = pageSize
    //   this.pagination.pageNum = 1
    //   this.getMenuList()
    // },
    // handleCurrentChange (pageNum) {
    //   this.pagination.pageNum = pageNum
    //   this.getMenuList()
    // }
  },
  computed: {
    ...mapGetters({
      userInfo: 'User/userInfo'
    }),
    tableColumnShown () {
      return this.tableColumn.filter(tc => tc.show)
    }
  },
  watch: {
    tableExpand (tableExpand) {
      const vm = this

      function toggleTree (tableData) {
        for (let i = 0; i < tableData.length; i++) {
          const tableDat = tableData[i]
          vm.$refs.table.toggleRowExpansion(tableDat, tableExpand)
          if (tableDat.children && tableDat.children.length !== 0) {
            toggleTree(tableDat.children)
          }
        }
      }
      toggleTree(this.tableData)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
