<template>
  <transition-group
    name="tag-group-complete"
    tag="div"
    class="flex">
    <div v-for="(tag,i) in tagList" :key="tag.url" class="tag-content m-r-10 cursor-pointer">
      <el-tag
        type="info"
        size="small"
        effect="plain"
        :class="[{'tag-select': isCurRouter(tag)},'tag-item']"
        @close="closeTag(tag,i)"
        @click="switchRouter(tag)"
        :closable="tagList.length !== 1">
        {{ tag.name }}
      </el-tag>
    </div>
  </transition-group>
</template>

<script>
export default {
  data () {
    return {
      curRoute: null
    }
  },
  methods: {
    closeTag (tag, i) {
      // 删除的是当前访问的tag时
      if (this.isCurRouter(tag)) {
        // 获取最近的tag
        const nearlyTag = (i => {
          let nearlyTagIndex = 0
          const tagListLength = this.tagList.length
          nearlyTagIndex = tagListLength === i + 1 ? i - 1 : i + 1
          return this.tagList[nearlyTagIndex]
        })(i)
        this.$router.push(nearlyTag.url)
      }
      this.$store.commit('Main/TAG_DEL', tag)
    },
    isCurRouter (tag) {
      return this._.isEqual(tag, this.curRoute)
    },
    switchRouter (tag) {
      if (tag.url !== this.$route.fullPath) {
        this.$router.push(tag.url)
      }
    }
  },
  computed: {
    tagList () {
      return this.$store.getters['Main/tagList']
    }
  },
  watch: {
    $route: {
      handler: function (to) {
        /**
         * 格式与tagList中对象一致，方便判断
         * @type {{name, url: string}}
         */
        this.curRoute = {
          name: to.meta.title,
          url: to.fullPath
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-content {
  display: inline-block;
  transition: all .5s;
}

.tag-group-complete-enter, .tag-group-complete-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.tag-group-complete-leave-active {
  position: absolute;
  z-index: -1;
}

.tag-select {
  background-color: #3995f3;
  color: #fff;

  ::v-deep {
    .el-icon-close {
      color: #fff;
    }
  }
}

.tag-item {
  transition: background-color .2s;
}

@keyframes mymove {
  50% {
    background: blue bottom right/50px 50px;
  }
}
</style>
