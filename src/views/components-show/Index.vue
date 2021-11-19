<template>
  <div class="components-show">
    <div class="grid">
      <div class="grid-cell">
        <div class="grid-title">
          <el-tag type="success">进度条按钮</el-tag>
        </div>
        <button-progress></button-progress>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonProgress from '@/components/store/button-progress/Index'

export default {
  components: { ButtonProgress }
}
</script>

<style lang="scss" scoped>
.grid{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .grid-cell{
    position: relative;
    flex: 0 0 calc(25% - 3px);
    height: 250px;
    border-right: 3px solid #f3f3f3;
    border-bottom: 3px solid #f3f3f3;
    display: flex;
    justify-content: center;
    align-items: center;
    .grid-title{
      position: absolute;
      top: 0px;
      left: 0px;
    }
  }
}
.components-show {
  width: 100%;
  height: 100%;
}
</style>
