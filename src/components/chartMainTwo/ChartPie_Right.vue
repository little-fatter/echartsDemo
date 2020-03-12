<template>
  <div :id="id" :style="{'width':width,'height':height}">

  </div>
</template>
<style lang="">

</style>
<script>
export default {
  name: '',
  data () {
    return {
      option: null,
      chartData: [{
        name: 'A河流', value: 37
      }, {
        name: 'B河流', value: 32
      }, {
        name: 'C河流', value: 17
      }, {
        name: 'D河流', value: 8
      }, {
        name: 'E河流', value: 6
      }]
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    },
    doRender: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    renderChart () {
      this.option = {
        legend: {
          show: true,
          orient: 'horizontal',
          left: 'center',
          top: 'bottom',
          data: this.chartData.map(o => {
            return o.name
          }),
          textStyle: {
            fontSize: 18,
            color: '#fff'
          }
        },
        color: ['#279cf2', '#13c2c2', '#bae7ff', '#03e4ff', '#b7eb8f'],
        series: [{
          name: '',
          type: 'pie',
          radius: '65%',
          center: ['50%', '45%'],
          data: this.chartData,
          label: {
            show: true,
            formatter: '{c}%',
            position: 'outside'
          }
        }]
      }
      this.$chartRender(this.id, this.option)
    }
  },
  watch: {
    doRender (n) {
      if (n) {
        this.renderChart()
      }
    }
  }
}
</script>
