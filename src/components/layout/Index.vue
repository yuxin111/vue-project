<template>
  <el-container class="layout-base">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside-base">
        <Aside></Aside>
      </el-aside>
      <el-main>
        <div class="breadcrumb-container flex-align-center">
          <FoldIcon class="m-r-10"></FoldIcon>
          <Breadcrumb></Breadcrumb>
        </div>
        <div class="tag-container">
          <History></History>
        </div>
        <div :class="[
          'main-container',
          bgColor ? `bg-${bgColor}` : '',
          {
            'p-15': needPadding
          }
        ]">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './Aside'
import Header from './Header'
import Breadcrumb from './Breadcrumb'
import FoldIcon from './FoldIcon'
import History from './History'

export default {
  components: {
    Aside,
    Header,
    Breadcrumb,
    FoldIcon,
    History
  },
  computed: {
    bgColor () {
      return this.$route.meta.bgColor
    },
    needPadding () {
      return !this.$route.meta['no-padding']
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-base {
  min-height: 100vh;
  overflow: hidden;

  .aside-base {
    min-height: calc(100vh - 60px);
  }

  .breadcrumb-container {
    padding: 10px;
    background-color: #e2e6ea;
  }

  .tag-container {
    padding: 6px 0 6px 10px;
    background-color: #f3f3f3;
  }

  .main-container {
    flex-grow: 1;
  }

  .el-main {
    height: calc(100vh - 60px);
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
  }

  .el-main, .el-header {
    padding: 0;
  }

}
</style>
