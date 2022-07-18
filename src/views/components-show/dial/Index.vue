/**
* 拨号盘
* author: yuxin
* createtime: 2022-07-11
* All rights reserved.
*/
<template>
  <div class="dial">
    <div class="dial-wrap">
      <div class="dial-container">
        <div class="dial-item">1</div>
        <div class="dial-item">2</div>
        <div class="dial-item">3</div>
        <div class="dial-item">4</div>
        <div class="dial-item">5</div>
        <div class="dial-item">6</div>
        <div class="dial-item">7</div>
        <div class="dial-item">8</div>
        <div class="dial-item">9</div>
        <div class="dial-item">*</div>
        <div class="dial-item">0</div>
        <div class="dial-item">#</div>
        <div class="dial-item">取消</div>
        <div class="dial-item">拨打</div>
        <div class="dial-item">删除</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  watch: {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.dial {
  position: relative;
  width: 360px;
  //background-color: #ccc;
  .dial-wrap{
    .dial-container{
      display: flex;
      flex-wrap: wrap;
      //width: 100%;
      //height: 100%;
      border-top: 1px solid #EAEAEA;
      border-left: 1px solid #EAEAEA;
      .dial-item{
        flex: 0 0 calc((100% - 3px) * 1/3);
        height: calc(360px * 1/3);
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #EAEAEA;
        border-bottom: 1px solid #EAEAEA;
        font-size: 30px;
        color: #636565;
        user-select: none;
        &:hover{
          background-color: #f58e5a;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
