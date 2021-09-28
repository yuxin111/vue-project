<template>
  <div class="article">

    <!--  查询参数  -->
    <!--    <div class="search text-center">-->
    <!--      <el-form :model="search" label-width="80px" inline>-->
    <!--        <el-form-item label="操作">-->
    <!--          <el-input v-model="search.article" placeholder="请输入操作" size="small"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="返回结果">-->
    <!--          <el-select v-model="search.status" placeholder="请选择返回结果" size="small" clearable>-->
    <!--            <el-option label="成功" :value="1"></el-option>-->
    <!--            <el-option label="失败" :value="0"></el-option>-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="操作人">-->
    <!--          <el-input v-model="search.loginName" placeholder="请输入操作人" size="small"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="操作时间">-->
    <!--          <date-time v-model="search.operDateTime"></date-time>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item>-->
    <!--          <el-button type="primary" icon="el-icon-search" size="mini" v-icon-shake @click="queryArticleList">搜索</el-button>-->
    <!--          <el-button icon="el-icon-refresh" size="mini" v-icon-rotate @click="resetSearch">重置</el-button>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--    </div>-->

    <!--  工具栏  -->
    <div class="tools flex-space-between flex-align-center">
      <div class="tools-btn">
        <el-button icon="el-icon-plus" type="primary" size="small" plain
                   :disabled="!$_hasPermission('article:operArticle:add')"
                   @click="addArticle">新增
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
                       :disabled="!$_hasPermission('article:operArticle:watch')"
                       @click="handleArticleInfo('watch',scope.row)">查看
            </el-button>
            <el-button type="text" size="small"
                       :disabled="!$_hasPermission('article:operArticle:edit')"
                       @click="handleArticleInfo('edit',scope.row)">编辑
            </el-button>
            <el-popconfirm
              title="是否删除此文章？"
              icon="el-icon-info"
              icon-color="red"
              placement="top"
              @confirm="deleteArticleInfo(scope.row)"
            >
              <el-button type="text" size="small" slot="reference" class="m-l-10"
                         :disabled="!$_hasPermission('article:operArticle:delete')">删除
              </el-button>
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

    <!--  用户信息dialog  -->
    <el-dialog
      :title="
        operaStatus === 'add' ? '新增文章' :
        operaStatus === 'edit' ? '修改文章' : '文章信息'"
      :visible.sync="articleDialog.visible"
      :close-on-click-modal="false"
      width="700px">
      <ArticleInfo
        :propData="articleDialog.data"
        :confirmLoading="articleDialog.confirmLoading"
        :visible="articleDialog.visible"
        @confirm="confirmArticleInfo"
        @cancel="articleDialog.visible = false"
      />
    </el-dialog>

  </div>
</template>

<script>
import permission from '@/utils/mixin/permission'
import tableColumn from './tableColumn'
import ArticleInfo from './component/ArticleInfo'
import { mapGetters } from 'vuex'

export default {
  mixins: [permission],
  components: {
    ArticleInfo
  },
  data () {
    return {
      tableColumn, // 表格字段数据
      operaStatus: '', // 当前操作状态（'add'、'edit'、'watch'）
      search: {
        article: '',
        loginName: '',
        status: '',
        operDateTime: []
      },
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: null
      },
      articleDialog: {
        visible: false,
        confirmLoading: false,
        data: {}
      },
      tableData: [],
      tableLoading: false
    }
  },
  mounted () {
    this.getArticleList()
  },
  methods: {
    getArticleList () {
      const [createBeginTime, createEndTime] = this.search.operDateTime
      const params = {
        article: this.search.article,
        loginName: this.search.loginName,
        status: this.search.status,
        createBeginTime,
        createEndTime
      }
      this.tableLoading = true
      this.$api.article.getArticleList({
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
    getArticleById (id) {
      return new Promise(resolve => {
        this.$api.article.getArticleById(id)
          .then(res => {
            resolve(res)
          })
      })
    },
    queryArticleList () {
      this.pagination.pageNum = 1
      this.getArticleList()
    },
    addArticle () {
      this.operaStatus = 'add'
      this.articleDialog.visible = true
      this.articleDialog.data = { _status: this.operaStatus }
    },
    confirmArticleInfo (formData) {
      const params = {
        ...formData
      }
      const apiName = formData._status === 'add' ? 'addArticle' : 'updateArticle'
      this.articleDialog.confirmLoading = true
      this.$api.article[apiName](params)
        .then(res => {
          this.$message({
            message: '保存文章成功',
            type: 'success'
          })
          this.articleDialog.visible = false
          this.handleCurrentChange(1)
        })
        .finally(() => {
          this.articleDialog.confirmLoading = false
        })
    },
    async handleArticleInfo (operaStatus, row) {
      const article = await this.getArticleById(row.id)
      this.operaStatus = operaStatus
      this.articleDialog.visible = true
      this.articleDialog.data = this._.merge(
        { _status: this.operaStatus },
        this._.cloneDeep(article)
      )
    },
    deleteArticleInfo (row) {
      this.$api.article.deleteArticle(row.id)
        .then(() => {
          this.$message({
            message: '删除文章成功',
            type: 'success'
          })
          this.handleCurrentChange(1)
        })
    },
    refresh () {
      this.resetSearch()
      this.queryArticleList()
    },
    resetSearch () {
      this.search.article = ''
      this.search.loginName = ''
      this.search.status = ''
      this.search.operDateTime = []
    },
    handleSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.pageNum = 1
      this.getArticleList()
    },
    handleCurrentChange (pageNum) {
      this.pagination.pageNum = pageNum
      this.getArticleList()
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
