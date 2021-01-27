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
          <Tag></Tag>
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './Aside'
import Header from './Header'
import Breadcrumb from './Breadcrumb'
import FoldIcon from './FoldIcon'
import Tag from './Tag'

export default {
  components: {
    Aside,
    Header,
    Breadcrumb,
    FoldIcon,
    Tag
  },
  methods: {
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
    padding: 15px;
    background-color: #e2e6ea;
  }

  .tag-container{
    padding: 10px;
    background-color: #f3f3f3;
  }

  .el-main, .el-header {
    padding: 0;
  }

}
</style>
