<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="matchedItem in matched"
        :key="matchedItem.path">
        {{ matchedItem.meta.title }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      matched: []
    }
  },
  watch: {
    $route: {
      handler (route) {
        this.matched = route.matched.slice(1, route.meta.length)
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
  .breadcrumb-enter-active {
    transition: all .5s;
  }

  .breadcrumb-leave-active {
    transition: all .5s;
  }

  .breadcrumb-enter {
    opacity: 0;
    transform: translateX(30px);
  }

  .breadcrumb-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
</style>
