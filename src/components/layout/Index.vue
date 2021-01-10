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
        <div class="breadcrumb-container">
          <Breadcrumb></Breadcrumb>
        </div>
        <el-button @click="toggleCollpase">toggle</el-button>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './Aside'
import Header from './Header'
import Breadcrumb from './Breadcrumb'

export default {
  components: {
    Aside,
    Header,
    Breadcrumb
  },
  methods: {
    toggleCollpase () {
      this.$store.commit('Main/COLLAPSE_TOGGLE')
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
    padding: 20px;
    background-color: #f3f3f3;
  }

  .el-main, .el-header {
    padding: 0;
  }

}
</style>
