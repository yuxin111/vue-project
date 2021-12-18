<template>
  <div class="test">
    <div class="m-warning">
      <div class="warning-pie" id="pieChart"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-gl'

export default {
  components: {},
  data() {
    return {}
  },
  mounted() { // 加载完DOM渲染
    this.handlePieChart()
  },
  methods: {
    /*
    *预警情况饼图
     */
    handlePieChart() {
      // let myMidd = this.$echarts.init(document.getElementById('bzt1'))
      var echarts = require('echarts')
      var myChart = echarts.init(document.getElementById('pieChart'))

      function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, height) {
        // 计算
        // console.log("getParametricEquation")
        const midRatio = (startRatio + endRatio) / 2
        const startRadian = startRatio * Math.PI * 2
        const endRadian = endRatio * Math.PI * 2
        const midRadian = midRatio * Math.PI * 2

        if (startRatio === 0 && endRatio === 1) {
          isSelected = false
        }

        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = typeof k !== 'undefined' ? k : 1 / 3

        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
        const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0

        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        const hoverRate = isHovered ? 1.05 : 1

        // 返回曲面参数方程
        return {

          u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32
          },

          v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20
          },

          x: function (u, v) {
            if (u < startRadian) {
              return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            }
            if (u > endRadian) {
              return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
          },

          y: function (u, v) {
            if (u < startRadian) {
              return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            }
            if (u > endRadian) {
              return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
          },

          z: function (u, v) {
            if (u < -Math.PI * 0.5) {
              return Math.sin(u)
            }
            if (u > Math.PI * 2.5) {
              return Math.sin(u)
            }
            return Math.sin(v) > 0 ? 1 * height : -1
          }
        }
      }

      // 3D饼图的配置项，同echarjs的series
      function getPie3D(pieData, internalDiameterRatio) {
        const series = []
        let sumValue = 0
        let startValue = 0
        let endValue = 0
        const legendData = []
        const k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3

        // 3个饼图参数
        for (let i = 0; i < pieData.length; i++) {
          sumValue += pieData[i].value

          const seriesItem = {
            name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
            type: 'surface',
            parametric: true,
            wireframe: {
              show: false
            },
            label: {
              normal: {
                position: 'inner',
                show: false
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 50,
                length2: 100
              }
            },
            pieData: pieData[i],
            pieStatus: {
              selected: false,
              hovered: false,
              k: k
            }
          }
          if (typeof pieData[i].itemStyle !== 'undefined') {
            const itemStyle = {}
            // eslint-disable-next-line no-unused-expressions
            typeof pieData[i].itemStyle.color !== 'undefined' ? itemStyle.color = pieData[i].itemStyle.color : null
            // eslint-disable-next-line no-unused-expressions
            typeof pieData[i].itemStyle.opacity !== 'undefined' ? itemStyle.opacity = pieData[i].itemStyle.opacity : null
            seriesItem.itemStyle = itemStyle
          }
          series.push(seriesItem)
        }

        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++) {
          endValue = startValue + series[i].pieData.value
          console.log(series[i])
          series[i].pieData.startRatio = startValue / sumValue
          series[i].pieData.endRatio = endValue / sumValue
          series[i].parametricEquation = getParametricEquation(series[i].pieData.startRatio, series[i].pieData.endRatio,
            false, false, k, series[i].pieData.value)
          startValue = endValue
          legendData.push(series[i].name)
        }
        // 准备待返回的配置项，把准备好的 legendData、series 传入。
        const option = {
          tooltip: {
            formatter: params => {
              if (params.seriesName !== 'mouseoutSeries') {
                return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${option.series[params.seriesIndex].pieData.value}`
              }
            }
          },
          legend: {
            data: legendData,
            itemWidth: 15, // 色标图宽
            itemHeight: 7, // 色标图高
            orient: 'vertical', // 垂直显示
            top: 5,
            right: 60,
            itemGap: 25, // 色标间隔
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          xAxis3D: {
            min: -1,
            max: 1
          },
          yAxis3D: {
            min: -1,
            max: 1
          },
          zAxis3D: {
            min: -1,
            max: 1
          },
          grid3D: {
            show: false,
            boxHeight: 20,
            top: '-30',
            left: '-70',
            bottom: '80%',
            environment: 'auto',
            viewControl: {
              distance: 200, // 远近
              alpha: 25, // 饼图X轴旋转
              beta: 0// 饼图Y轴旋转
            }

          },
          series: series
        }
        return option
      }

      const option = getPie3D([{
        name: 'SOS',
        value: 3,
        itemStyle: {
          opacity: 1,
          color: 'rgba(228,220,65,1)'
        }
      },
      {
        name: '掉线',
        value: 1,
        itemStyle: {
          opacity: 1,
          color: 'rgba(77,157,229,1)'
        }
      },
      {
        name: '脱岗',
        value: 1,
        itemStyle: {
          opacity: 1,
          color: 'rgba(94,209,213,1)'
        }
      }

      ], 2)
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.m-warning {
  width: 450px;
  height: 270px;
  overflow: hidden;
  float: right;
  margin:60px 0 0 60px;
  .warning-pie{
    width:450px;
    height: 210px;
  }
}
</style>
