<template>
  <div class="palel-inverse-info">
    <panel-title :title="title" :date="date"></panel-title>
    <div class="date">
      <span>日期：</span>
      <span>2016年12月12日</span>
    </div>
    <div class="inner-title">
      <span>河流：</span>
      <span>东西大河</span>
    </div>
    <div class="item-wrapper">
      <div class="name">[总氮]入湖负荷：1839吨</div>
      <div class="chart">
        <a-progress strokeLinecap="square" :percent="75" :showInfo="false"/>
      </div>
    </div>
    <div class="inner-title">
      <span>上游流域面积：</span>
      <span>22019㎞²</span>
    </div>
    <div class="item-wrapper">
      <div class="name">[总氮]入河负荷：2345吨</div>
      <div class="chart">
        <a-progress strokeLinecap="square" :percent="75" :showInfo="false"/>
      </div>
    </div>
  </div>
</template>

<script>
import PanelTitle from '@/components/Dashboard/PanelTitle'
// import { LakePollutantsConcentrationDayAvg } from '@/api/waterQuality'
import { mapGetters } from 'vuex'
// 流域负荷-流域概括
export default {
  components: {
    PanelTitle
  },
  data () {
    return {
      title: '流域概括',
      date: ''
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

.palel-inverse-info {
  position: absolute;
  top: 100px;
  left: @p-left;
  z-index: @p-index;
  width: @p-width;
  height: 740px;
  .panel-bg();
  .date {
    width: 90%;
    margin: 0 auto 0 auto;
    height: 30px;
    line-height: 30px;
    font-size: 24px;
    color: #fff;
  }
  .inner-title {
    width: 90%;
    margin: 120px auto 0 auto;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    color: #fff;
  }
  .item-wrapper {
    display: flex;
    width: 90%;
    font-size: 24px;
    color: #fff;
    height: 60px;
    line-height: 60px;
    margin: 0 auto 0 auto;
    .name {
      flex: 1;
    }
    .chart {
      flex: 1;
    }
  }
}
</style>
