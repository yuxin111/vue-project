<!-- 圆柱占比图 -->
<template>
  <div class="circle-bar-ratio">
    <div class="empty-bar">
      <span v-show="isShowNumber" class="full-bar__number" :style="getNumberHeight()">{{ number }}</span>
    </div>
    <div class="full-bar" :style="getBarHeight()">
      <span v-show="isShowRatio" class="full-bar__ratio">{{ ratio }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CircleBarRatio',
  data() {
    return {
      ratio: '' // 所占百分比（%）
    }
  },
  mounted() {
  },
  props: {
    // 总数量
    total: {
      type: Number,
      default: 100
    },
    // 当前数量
    number: {
      type: Number,
      default: 50
    },
    // 是否显示百分比
    isShowRatio: {
      type: Boolean,
      default: false
    },
    // 是否显示数值
    isShowNumber: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getNumberHeight() {
      const num = (this.number / this.total) * 150 + 6
      return {
        bottom: num + 'px'
      }
    },
    getBarHeight() {
      const num = (this.number / this.total) * 150
      this.ratio = (this.number / this.total) * 100 + '%'
      return {
        height: num + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.circle-bar-ratio {
  position: relative;
  .empty-bar {
    position: relative;
    width: 80px;
    height: 150px;
    background-color: #ab8f27;
    opacity: .8;
    border-right: .5px solid #ccc;

    display: flex;
    justify-content: center;

    &:before {
      position: absolute;
      content: '';
      display: block;
      height: 12px;
      width: 100%;
      border-radius: 50%;
      top: -6px;
      background: radial-gradient(ellipse, #f7cf40, 70%, #ab8f27);
      z-index: -1;
    }

    &:after {
      position: absolute;
      content: '';
      display: block;
      height: 12px;
      width: 100%;
      border-radius: 50%;
      bottom: -6px;
      background: radial-gradient(#f7cf40, #ab8f27);
      z-index: -1;
    }
  }

  .full-bar {
    position: absolute;
    bottom: 0;
    width: 80px;
    background: linear-gradient(to bottom, #f7cf40, #fee39f);

    display: flex;
    align-items: center;
    justify-content: center;

    &:before {
      position: absolute;
      content: '';
      display: block;
      height: 12px;
      width: 100%;
      border-radius: 50%;
      top: -6px;
      background: linear-gradient(to bottom, #f7cf40, #fee39f);
    }

    &:after {
      position: absolute;
      content: '';
      display: block;
      height: 12px;
      width: 100%;
      border-radius: 50%;
      bottom: -6px;
      background: linear-gradient(to top, #f7cf40, #fee39f);
    }
  }

  .full-bar__ratio {
    margin-top: calc(12px / 2);
    color: #fff;
  }

  .full-bar__number {
    position: absolute;
    color: #fff;
    font-size: 1.3em;
  }
}
</style>
