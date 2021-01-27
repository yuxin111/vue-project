<template>
  <transition-group
    name="tag-complete"
    tag="div"
    class="flex">
    <div v-for="tag in tagList" :key="tag.url" class="tag-content m-r-10 cursor-pointer">
      <el-tag type="info" size="small" effect="plain" @close="closeTag(tag)" closable>{{ tag.name }}</el-tag>
    </div>
  </transition-group>
</template>

<script>
// import Velocity from 'velocity-animate'

export default {
  name: 'Tag',
  methods: {
    closeTag (tag) {
      this.$store.commit('Main/TAG_DEL', tag)
    }
  },
  computed: {
    tagList () {
      return this.$store.getters['Main/tagList']
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-content {
  display: inline-block;
  position: relative;
  transition: all 1s;
}

.tag-complete-enter {
  opacity: 0;
  transform: translateX(30px);
}

.tag-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.tag-complete-leave-active {
  position: absolute;
  left: 10px;
}
</style>
