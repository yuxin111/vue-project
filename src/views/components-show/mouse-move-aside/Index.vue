/**
* 鼠标移动触发侧边栏
* author: yuxin
* createtime: 2022-01-20
* All rights reserved.
*/
<template>
  <div class="mouse-move-aside">
    <!--  触发区域  -->
    <div class="emit-place" @mouseenter="show = true" @mouseleave="show = false"></div>
    <!--  弹窗  -->
    <transition>
      <div class="windows-container windows-container--animation"
           :style="{right: windowWidth + 'px'}">
          12312313
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  data() {
    return {
      show: false,
      windowWidth: -300 // 弹窗宽度
    }
  },
  watch: {
    show(show) {
      this.windowWidth = show ? 0 : -300
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.mouse-move-aside {
  position: relative;
  width: 100%;
  height: 100%;

  .emit-place {
    position: absolute;
    left: 0;
    width: 10px;
    height: 100%;
    background: #00ff80;
  }

  .windows-container {
    height: 100%;
    position: fixed;
    right: -300;
    width: 300px;
    top: 0;
    background: #1c6ca1;
    opacity: .4;
  }

  .windows-container--animation {
    transition: all 1s;
  }
}
</style>
