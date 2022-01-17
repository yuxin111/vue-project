<template>
  <div class="close-back-icon">
    <transition name="close-back">
      <i v-if="status === 'close'" key="close" class="el-icon-close"></i>
      <i v-else-if="status === 'left'" key="back" class="el-icon-back"></i>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CloseBackIcon',
  data() {
    return {
      status: 'close' // 当前状态（close -- 显示关闭按钮；left -- 显示返回按钮）
    }
  },
  mounted() {
    this.status = 'close'
  },
  methods: {
    test() {
      this.status = this.status === 'close' ? 'left' : 'close'
    }
  }
}
</script>

<style lang="scss" scoped>
.close-back-icon {
  position: relative;
  left: -.9rem;
  top: -.9rem;

  i {
    position: absolute;
  }
}

.close-back-enter-active {
  transition: all .3s ease;
}

.close-back-leave-active {
  transition: all .2s ease;
}

.close-back-enter {
  transform: rotate(180deg);
  opacity: 0;
}

.close-back-leave-to {
  transform: rotate(-180deg);
  opacity: 0;
}

.el-icon-close, .el-icon-back {
  font-size: 1.8rem;
}

</style>
