<template>
  <div class="rank-wrapper">
    <div class="rank-head"></div>
    <div class="rank-title">
      <div class="title-item"></div>
    </div>
    <div class="rank-item" v-for="item in data" :key="item.name">
      <div class="item">{{ item.text }}</div>
      <div class="item">{{ item.name }}</div>
      <div class="item">{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
import { ContributionRiverTPCentralStationPoint } from '@/api/waterQuality'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      data: []
    }
  },
  created () {
    this._ContributionRiverTPCentralStationPoint()
  },
  computed: {
    ...mapGetters([
      'lake'
    ])
  },
  methods: {
    _ContributionRiverTPCentralStationPoint () {
      ContributionRiverTPCentralStationPoint().then(res => {
        this.data = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.rank-wrapper {
  .rank-head {
    height:30px;
    font-size:24px;
    font-weight:400;
    line-height:30px;
    color:rgba(111,239,251,1);
  }
  .rank-title {
    width: 90%;
    margin: 10px auto;
    display: flex;
    .title-item {
      flex: 1;
      height:26px;
      font-size:20px;
      font-weight:400;
      line-height:26px;
      color:rgba(56,237,253,1);
      text-align: center;
    }
  }
  .rank-item {
    width: 90%;
    margin: 10px auto;
    display: flex;
    height:60px;
    background:rgba(56,145,238,.1);
    opacity:0.1;
    border-radius:5px;
    .item {
      flex: 1;
      height:60px;
      font-size:20px;
      font-weight:400;
      line-height:60px;
      color:rgba(187,201,208,1);
      text-align: center;
    }
  }
}
</style>
