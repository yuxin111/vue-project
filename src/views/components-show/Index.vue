<template>
  <div class="components-show">
    <div class="grid">
      <div class="grid-cell">
        <div class="grid-main">
          <button-progress ref="buttonProgress"></button-progress>
        </div>
        <div class="grid-footer">
          <div class="grid-footer__name">进度条按钮</div>
          <div class="grid-footer__func">
            <el-link type="primary" @click="showButtonProgress">演示</el-link>
          </div>
        </div>
      </div>

      <div class="grid-cell">
        <div class="grid-main">
          <el-empty description="等待制作中..."></el-empty>
        </div>
        <div class="grid-footer">
          <div class="grid-footer__name">待办</div>
          <div class="grid-footer__func">
            <el-link type="primary">演示</el-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ButtonProgress from '@/components/store/button-progress/Index'

export default {
  components: { ButtonProgress },
  methods: {
    showButtonProgress () {
      this.$refs.buttonProgress.$el.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .grid-cell {
    position: relative;
    flex: 0 0 calc(25% - 1px);
    height: 250px;
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;
    background-color: #f3f3f3;
    //.grid-title{
    //  position: absolute;
    //  top: 0px;
    //  left: 0px;
    //}
    .grid-main {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .grid-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    border-top: 1px solid #ccc;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .grid-footer__name {
      margin-left: 10px;
      font-size: 1.1em;
      font-weight: 700;
    }

    .grid-footer__func {
      margin-right: 10px;

    }
  }
}

.components-show {
  width: 100%;
  height: 100%;
}
</style>
