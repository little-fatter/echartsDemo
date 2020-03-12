<template>
  <div class="palel-lake">
    <panel-title title="当日湖体概况"></panel-title>
    <div class="in-title">当日湖体概况</div>
    <div class="date">日期：{{ lakeInfo.dt }}</div>
    <div class="item-title">
      <div class="title">污染物（{{ lakeInfo.pollutantName }}）浓度概况</div>
      <div class="item-wrapper">
        <div class="name">平均浓度（mg/L）</div>
        <div class="bar"><a-progress :percent="(lakeInfo.pollConcentrationAvg / lakeInfo.pollConcentrationTotal)*100" /></div>
        <div class="value">{{ numberTofixed(lakeInfo.pollConcentrationAvg) }}</div>
      </div>
      <div class="item-wrapper">
        <div class="name">湖中总量（吨）</div>
        <div class="bar"><a-progress :percent="(lakeInfo.pollTonCenter / lakeInfo.pollTonAll)*100" /></div>
        <div class="value">{{ numberTofixed(lakeInfo.pollTonCenter) }}</div>
      </div>
    </div>
    <div class="item-title">
      <div class="title">水量平衡概况</div>
      <div class="item-wrapper">
        <div class="name">水位（m）</div>
        <div class="bar"><a-progress :percent="0" /></div>
        <div class="value">0</div>
      </div>
      <div class="item-wrapper">
        <div class="name">蓄水量（m³）</div>
        <div class="bar"><a-progress :percent="(lakeInfo.storageCapacityNowValue / lakeInfo.storageCapacityYearMaxValue)*100" /></div>
        <div class="value">{{ numberTofixed(lakeInfo.storageCapacityNowValue) }}</div>
      </div>
      <div class="item-wrapper">
        <div class="name">河道入湖水量（m³）</div>
        <div class="bar"><a-progress :percent="(lakeInfo.waterInNowValue / lakeInfo.waterInYearMaxValue)*100" /></div>
        <div class="value">{{ numberTofixed(lakeInfo.waterInNowValue) }}</div>
      </div>
      <div class="item-wrapper">
        <div class="name">湖面降雨水量（m³）</div>
        <div class="bar"><a-progress :percent="(lakeInfo.rainfallNowValue / lakeInfo.rainfallYearMaxValue)*100" /></div>
        <div class="value">{{ numberTofixed(lakeInfo.rainfallNowValue) }}</div>
      </div>
      <div class="item-wrapper">
        <div class="name">湖面蒸发水量（m³）</div>
        <div class="bar"><a-progress :percent="(lakeInfo.evaporationNowValue / lakeInfo.evaporationYearMaxValue)*100" /></div>
        <div class="value">{{ numberTofixed(lakeInfo.evaporationNowValue) }}</div>
      </div>
      <div class="item-wrapper">
        <div class="name">湖泊出流水量（m³）</div>
        <div class="bar"><a-progress :percent="(lakeInfo.lakeOutNowValue / lakeInfo.lakeOutYearMaxValue)*100" /></div>
        <div class="value">{{ numberTofixed(lakeInfo.lakeOutNowValue) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import PanelTitle from '@/components/Dashboard/PanelTitle'
import { LakeGeneralSituation } from '@/api/waterQuality'
import { mapGetters } from 'vuex'
// 当日湖体概括
export default {
  components: {
    PanelTitle
  },
  computed: {
    ...mapGetters([
      'lake', 'waterQualityDate', 'waterQualityPoll'
    ])
  },
  data () {
    return {
      lakeInfo: {}
    }
  },
  created () {
    this._LakeGeneralSituation()
  },
  methods: {
    numberTofixed (data) {
      var num
      if (data === 0) {
        num = 0
      } else {
        num = data.toFixed(2)
      }
      return num
    },
    _LakeGeneralSituation () {
      var param = {
        lake: this.lake,
        date: this.waterQualityDate,
        poll: this.waterQualityPoll
      }
      LakeGeneralSituation(param).then(res => {
        if (res) {
          this.lakeInfo = res
        }
      })
    }
  },
  watch: {
    lake () {
      this._LakeGeneralSituation()
    },
    waterQualityPoll () {
      this._LakeGeneralSituation()
    },
    waterQualityDate () {
      this._LakeGeneralSituation()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~../../../assets/css/variable.less';
@left:50px;
/deep/ .ant-progress-inner {
  background: #435674;
}
/deep/ .ant-progress-bg {
  background: #01DFF1;
}
.palel-lake {
  position: absolute;
  top: 100px;
  left: @p-left;
  z-index: @p-index;
  width: @p-width;
  height: 850px;
  padding: 0 10px;
  color: #fff;
  .panel-bg();
  .in-title {
    margin-left: @left;
    font-size:24px;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-top: 20px;
  }
  .date {
    margin-left: @left;
    font-size:18px;
    font-weight:400;
    color:rgba(187,201,208,1);
  }
  .item-title {
    .title {
      font-size:24px;
      font-weight:400;
      line-height:15px;
      color:rgba(255,255,255,1);
      margin-left: @left;
      margin-top: 40px;
      margin-bottom: 40px;
    }
    .item-wrapper{
      height: 50px;
      line-height: 50px;
      display: flex;
      margin-left: @left;
      font-size:18px;
      font-weight:400;
      color:rgba(187,201,208,1);
      .name {
        flex: 1;
      }
      .value{
        flex: 1;
      }
      .bar{
        flex: 1;
      }
    }
  }
}
</style>
