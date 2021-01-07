<template>
  <el-container class="container-base">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside-base">
        <Aside></Aside>
      </el-aside>
      <el-main>
        <el-button @click="toggleCollpase">toggle</el-button>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './Aside'
import Header from './Header'

export default {
  components: {
    Aside,
    Header
  },
  methods: {
    toggleCollpase () {
      this.$store.commit('Main/COLLAPSE_TOGGLE')
    }
  }
}
</script>

<style lang="scss" scoped>
.container-base {
  min-height: 100vh;
  overflow: hidden;

  .aside-base {
    min-height: calc(100vh - 60px);
  }
}
</style>
