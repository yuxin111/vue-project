<template>
  <div class="article">

    <!--  工具栏  -->
    <!--    <div class="tools flex-space-between flex-align-center">-->
    <!--      <div class="tools-btn">-->
    <!--        <el-button icon="el-icon-plus" type="primary" size="small" plain-->
    <!--                   :disabled="!$_hasPermission('article:operArticle:add')"-->
    <!--                   @click="addArticle">新增-->
    <!--        </el-button>-->
    <!--      </div>-->
    <!--      <div class="tools-opera">-->
    <!--        <el-tooltip class="item" effect="dark" content="刷新" placement="top">-->
    <!--          <el-button type="primary" size="small" circle v-icon-rotate><i class="el-icon-refresh"/></el-button>-->
    <!--        </el-tooltip>-->
    <!--        <el-dropdown class="m-l-10" :hide-on-click="false">-->
    <!--          <el-button type="primary" size="small" circle><i class="el-icon-menu"/></el-button>-->
    <!--          <el-dropdown-menu slot="dropdown">-->
    <!--            <el-dropdown-item v-for="(tc,i) in tableColumn" :key="i">-->
    <!--              <el-checkbox v-model="tc.show" :disabled="!tc.editable">{{ tc.label }}</el-checkbox>-->
    <!--            </el-dropdown-item>-->
    <!--          </el-dropdown-menu>-->
    <!--        </el-dropdown>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--  查询参数  -->
    <div class="search text-center m-t-15">
      <el-input placeholder="请输入任意想搜索的内容.." v-model="search.text" class="input-with-select" @input="debounceInput">
        <el-button slot="append" type="primary" icon="el-icon-plus" v-icon-rotate @click="addArticle"
                   :disabled="!$_hasPermission('article:operArticle:add')"></el-button>
      </el-input>
    </div>

    <div class="search-result-list m-t-15">
      <!--      <transition-group name="article-list">-->
      <el-card shadow="hover" v-for="(td,i) in tableData" :key="i">
        <div class="card-container">
          <div class="card-header flex-space-between">
            <!-- TODO 加上权限  -->
            <div class="card-title" v-html="td.title" @click="handleArticleInfo('watch',td)"></div>
            <div class="card-more">
              <el-dropdown trigger="click" @command="handleCommand">
                <i class="el-icon-more"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    icon="el-icon-view"
                    :command="beforeHandleCommand('watch',td)"
                    :disabled="!$_hasPermission('article:operArticle:watch')">查看
                  </el-dropdown-item>
                  <el-dropdown-item
                    icon="el-icon-edit"
                    :command="beforeHandleCommand('edit',td)"
                    :disabled="!$_hasPermission('article:operArticle:edit')">编辑
                  </el-dropdown-item>
                  <el-dropdown-item
                    icon="el-icon-delete"
                    class="f-color-warn"
                    :command="beforeHandleCommand('delete',td)"
                    :disabled="!$_hasPermission('article:operArticle:delete')"
                  >删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="card-main">
            <img v-if="td.content_previewUrl" :src="td.content_previewUrl" class="card-preview">
            <div class="card-content" v-html="td.content_withDeal">
            </div>
          </div>
          <div class="card-footer flex-space-between">
            <span>作者：{{td.author}}</span>
            <span>{{ td.updateTime }}</span>
          </div>
        </div>
      </el-card>
      <!--      </transition-group>-->
    </div>

    <!--  操作日志表格  -->
    <!--    <div class="table m-t-15">-->
    <!--      <el-table-->
    <!--        v-loading="tableLoading"-->
    <!--        :data="tableData"-->
    <!--        style="width: 100%">-->
    <!--        <el-table-column-->
    <!--          v-for="(tc,i) in tableColumnShown"-->
    <!--          :key="i"-->
    <!--          :prop="tc.prop"-->
    <!--          :label="tc.label"-->
    <!--          align="center">-->
    <!--          <template slot-scope="scope">-->
    <!--            &lt;!&ndash; 状态 &ndash;&gt;-->
    <!--            <template v-if="tc.prop === 'status'">-->
    <!--              {{ scope.row[tc.prop] === 0 ? '失败' : scope.row[tc.prop] === 1 ? '成功' : '' }}-->
    <!--            </template>-->
    <!--            &lt;!&ndash; 其他属性 &ndash;&gt;-->
    <!--            <template v-else>-->
    <!--              {{ scope.row[tc.prop] }}-->
    <!--            </template>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        <el-table-column-->
    <!--          fixed="right"-->
    <!--          label="操作"-->
    <!--          align="center">-->
    <!--          <template slot-scope="scope">-->
    <!--            <el-button type="text" size="small"-->
    <!--                       :disabled="!$_hasPermission('article:operArticle:watch')"-->
    <!--                       @click="handleArticleInfo('watch',scope.row)">查看-->
    <!--            </el-button>-->
    <!--            <el-button type="text" size="small"-->
    <!--                       :disabled="!$_hasPermission('article:operArticle:edit')"-->
    <!--                       @click="handleArticleInfo('edit',scope.row)">编辑-->
    <!--            </el-button>-->
    <!--            <el-popconfirm-->
    <!--              title="是否删除此文章？"-->
    <!--              icon="el-icon-info"-->
    <!--              icon-color="red"-->
    <!--              placement="top"-->
    <!--              @confirm="deleteArticleInfo(scope.row)"-->
    <!--            >-->
    <!--              <el-button type="text" size="small" slot="reference" class="m-l-10"-->
    <!--                         :disabled="!$_hasPermission('article:operArticle:delete')">删除-->
    <!--              </el-button>-->
    <!--            </el-popconfirm>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--      </el-table>-->
    <!--    </div>-->

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
      width="1200px">
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
import { removeHtmlTag, getFirstTagOrAttr, getThumbImg, debounce } from '@/utils/common'
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
        text: ''
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
    beforeHandleCommand (command, row) {
      return {
        command,
        row
      }
    },
    handleCommand (command) {
      switch (command.command) {
        case 'watch':
          this.handleArticleInfo('watch', command.row)
          break
        case 'edit':
          this.handleArticleInfo('edit', command.row)
          break
        case 'delete':
          this.deleteArticleInfo(command.row)
          break
      }
    },
    // attention：不要用匿名() => {}这种方法，this指向会有问题
    debounceInput: debounce(function () {
      this.queryArticleList()
    }, 300),
    getArticleList () {
      const params = {
        text: this.search.text
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
          this.tableData.map(td => {
            // TODO 压缩图片没有则读取原图片
            const originImgUrl = getFirstTagOrAttr(td.content, 'img', 'src').replace(/"/g, '')
            const thumbImgUrl = originImgUrl && getThumbImg(originImgUrl)
            this.$set(td, 'content_withDeal', this.dealWithContent(td.content))
            this.$set(td, 'content_previewUrl', thumbImgUrl)
          })
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    /**
     * 处理返回内容
     * @param content 带有html的内容
     * @param hitTag highlight标记的标签
     * @param sliceNum 截取多少个字符（不包含html标签，单纯看到的字符）
     */
    dealWithContent (content, hitTag = 'hl', sliceNum = 300) {
      const noHtmlContent = removeHtmlTag(content, hitTag)
      // eslint-disable-next-line no-eval
      const hits = (noHtmlContent.match(eval(`/<${hitTag}>/g`)) || []).length
      // 加上highlight的标签字符数，确保截得完整
      sliceNum += hits * ((hitTag.length + 2) * 2 + 1)
      if (noHtmlContent.length > sliceNum) {
        return noHtmlContent.slice(0, sliceNum) + '...'
      } else {
        return noHtmlContent
      }
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
      const noPermit = !this.$_hasPermission('article:operArticle:watch')
      if (noPermit) {
        this.$message({
          message: '暂无查看文章权限，请联系管理员',
          type: 'warning'
        })
        return
      }
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
      this.search.text = ''
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
.search {
  .el-button--primary {
    color: #fff;
    background-color: #409eff;
    border-radius: 0;
    border: 1px solid #409eff;
    margin: -10px -21px;
  }

  ::v-deep {
    .el-input-group__append {
      border: 1px solid #409eff;
    }
  }
}

.card-container {
  .card-title {
    font-size: 1.3em;
    color: #207ab7;
    margin-bottom: 5px;
    //text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #2e9de8;
    }
  }

  .el-icon-more {
    font-size: 1.3em;
    color: #ccc;
    cursor: pointer;
  }

  .card-main {
    display: flex;
    align-items: center;
    margin: 5px 0;

    .card-preview {
      border-radius: 5px;
      width: 75px;
      height: 75px;
      margin-right: 5px;
    }

    .card-content {
      font-size: .9em;
      line-height: 1.5em;
      color: rgb(34 47 62);
    }
  }

  .card-footer {
    margin-top: 10px;
    font-size: .9em;
    color: #ccc;
  }

  //.article-list-move {
  //  transition: transform 5s;
  //}
}
</style>
