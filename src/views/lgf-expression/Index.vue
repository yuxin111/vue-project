<template>
  <div class="lgf-expression">
    <el-input v-model="lgfExpression" placeholder="请输入LGF表达式"></el-input>
    <el-button type="primary" class="m-t-15" @click="vali">校验</el-button>
  </div>
</template>

<script>
export default {
  name: 'lgf-expression',
  data() {
    return {
      lgfExpression: '',  // lgf表达式

    }
  },
  methods: {
    vali(){

    }
  }
}
</script>

<style scoped>

</style>
