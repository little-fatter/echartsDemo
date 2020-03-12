<template>
  <div class="assist">
    <panel-img></panel-img>
    <panel-con-change></panel-con-change>
    <panel-improve></panel-improve>
    <panel-water-per></panel-water-per>
    <panel-water-value></panel-water-value>
    <pool-bar></pool-bar>
  </div>
</template>

<script>
import panelImg from './components/panelImg'
import panelConChange from './components/panelConChange'
import panelImprove from './components/panelImprove'
import panelWaterPer from './components/panelWaterPer'
import panelWaterValue from './components/panelWaterValue'
import poolBar from './components/poolBar'
// 辅助决策
export default {
  components: {
    panelImg,
    panelConChange,
    panelImprove,
    panelWaterPer,
    panelWaterValue,
    poolBar
  }
}
</script>

<style>

</style>
