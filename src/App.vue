<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fullscreenInterval: null
    }
  },
  mounted () {
    this.fullscreenInterval = setInterval(this.screen, 5000)
  },
  methods: {
    fullScreen (el) {
      const isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
      if (!isFullscreen) {
        (el.requestFullscreen && el.requestFullscreen()) ||
        (el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
        (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) || (el.msRequestFullscreen && el.msRequestFullscreen())
      } else {
        // eslint-disable-next-line no-unused-expressions
        document.exitFullscreen ? document.exitFullscreen()
          : document.mozCancelFullScreen ? document.mozCancelFullScreen()
            : document.webkitExitFullscreen ? document.webkitExitFullscreen() : ''
      }
    },
    toggleFullScreen (e) {
      const el = e.srcElement || e.target
      el.innerHTML === '点我全屏' ? el.innerHTML = '退出全屏' : el.innerHTML = '点我全屏'
      this.fullScreen(el)
    }
  }
}
</script>

<style lang="scss">
@import "~@/style/my.scss";
</style>
