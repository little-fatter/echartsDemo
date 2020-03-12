<template>
  <div class="palel-inverse-list">
    <panel-title :title="title" :date="date"></panel-title>
    <div class="item-wrapper" v-for="item in 8" :key="item">
      <div class="title">{{ item }}xx大河</div>
      <div class="chart"><a-progress strokeLinecap="square" :percent="75" :showInfo="false"/></div>
      <div class="value">153吨</div>
    </div>
  </div>
</template>

<script>
import PanelTitle from '@/components/Dashboard/PanelTitle'
// import { LakePollutantsConcentrationDayAvg } from '@/api/waterQuality'
import { mapGetters } from 'vuex'
// 湖体平均浓度
export default {
  components: {
    PanelTitle
  },
  data () {
    return {
      option: null,
      title: '（总氮）河流入湖负荷',
      date: '2016年1月1日 - 2016年12月31日'
    }
  },
  computed: {
    ...mapGetters([
      'lake', 'waterQualityPoll', 'waterQualityYear'
    ])
  },
  methods: {
  },
  mounted () {
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
@import '~../../../assets/css/variable.less';

.palel-inverse-list {
  position: absolute;
  top: 860px;
  right: @p-right;
  z-index: @p-index;
  width: @p-width;
  height: 740px;
  .panel-bg();
  .item-wrapper {
    display: flex;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    color: #fff;
    width: 90%;
    margin: 0 auto 0 auto;
    .title{
      width: 200px;
      text-align: center;
    }
    .chart {
      flex: 1;
    }
    .value {
      width: 150px;
      text-align: center;
    }
  }
}
</style>
