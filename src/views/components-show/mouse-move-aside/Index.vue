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
      <div class="windows-container"></div>
    </transition>
  </div>
</template>

<script>

export default {
  data() {
    return {
      show: false
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
    width: 300px;
    height: 100%;
    position: fixed;
    right: 0;
    top: 0;
    background: #1c6ca1;
    opacity: .4;
  }
}
</style>
