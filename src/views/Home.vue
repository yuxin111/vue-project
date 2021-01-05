<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{counts}}
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed: {
    ...mapGetters({
      counts: 'article/counts'
    })
  },
  mounted () {
    // 测试异步请求
    // this.$api.article.articleList({})
    //   .then(res => {
    //
    //   })
    // 测试vuex
    this.$store.dispatch('article/asyncAddCount')
  }
}
</script>
