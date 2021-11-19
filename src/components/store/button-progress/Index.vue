<template>
  <div class="my-button-progress">
    <i :class="[
        'm-r-5',
        'button-progress__icon',
        status == 'wait' ? 'el-icon-download' : status == 'doing' ? 'el-icon-loading' : 'el-icon-check'
      ]"></i>
    <span class="button-progress__text">
      download</span>
    <span class="button-progress__progress"></span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: 'wait' // wait,doing,finish
    }
  },
  mounted () {
    const vm = this
    const btn = document.querySelectorAll('.my-button-progress')[0]
    const pr = document.querySelectorAll('.button-progress__progress')[0]
    const text = document.querySelectorAll('.button-progress__text')[0]
    btn.addEventListener('click', () => {
      pr.style.left = '0'
      text.innerText = 'downloading'
      vm.status = 'doing'
      setTimeout(() => {
        pr.style.top = '0'
        pr.style.transitionDuration = '.5s'
        text.style.color = 'white'
        text.innerText = 'finished'
        vm.status = 'finish'
      }, 3000)
    })
  }
}
</script>

<style lang="scss" scoped>
.my-button-progress {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 40px;
  color: black;
  background: white;
  border-radius: 10px;
  margin: 0 15px;
  font-size: 18px;
  text-decoration: none;
  overflow: hidden;
}
.button-progress__icon{
  z-index: 1;
}
.el-icon-check{
  color: white;
}
.button-progress__text {
  z-index: 10;
}

.button-progress__progress {
  content: '';
  position: absolute;
  top: 90%;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #4776E6;
  background: -webkit-linear-gradient(to right, #8E54E9, #4776E6);
  background: linear-gradient(to right, #8E54E9, #4776E6);
  transition: all 3s;
}
</style>
