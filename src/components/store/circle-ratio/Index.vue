<template>
  <div class="circle-ratio">
    <div class="circle-ratio__ratio">50%</div>
    <div class="circle-origin">
      <div class="water-container"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CircleRatio'
}
</script>

<style lang="scss" scoped>
.circle-ratio {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .circle-ratio__ratio{
    position: absolute;
    color: #fff;
    font-size: 1.5em;
    z-index: 1;
  }
  //overflow: hidden;
  .circle-origin{
    position: relative;
    overflow: hidden;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(ellipse, #0f224d, 75%, #fff);
  }
  .water-container{
    position: absolute;
    top: 40px;
    left: -60%;
    width: 200px;
    height: 200px;
    border-radius: 40%;
    background: #00ff80;
    animation:turn 5s linear infinite;
  }
  @keyframes turn{
    0%{-webkit-transform:rotate(0deg);}
    25%{-webkit-transform:rotate(90deg);}
    50%{-webkit-transform:rotate(180deg);}
    75%{-webkit-transform:rotate(270deg);}
    100%{-webkit-transform:rotate(360deg);}
  }

}
</style>
