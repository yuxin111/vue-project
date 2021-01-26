<template>
  <div clas="layout-tag">
    <div v-for="(tag,i) in tagList" :key="i">
      {{tag}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  computed: {
    tagList () {
      return this.$store.getters['Main/tagList']
    }
  }
}
</script>

<style lang="scss" scoped>
  .layout-tag{
  }
</style>
