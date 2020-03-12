<template>
  <div class="place-bar">
    <div class="place-item" :class="{active: lakeSite === 'lakeBody'}" @click="changeLakeSite('lakeBody')">
      <img class="icon" :src="lakeSite === 'lakeBody' ? require('../icons/lake_all_active.png') : require('../icons/lake_all.png')" />
      <span class="text">湖体水质</span>
    </div>
    <div class="place-item" :class="{active: lakeSite === 'lakeFace'}" @click="changeLakeSite('lakeFace')">
      <img class="icon" :src="lakeSite === 'lakeFace' ? require('../icons/lake_face_active.png') : require('../icons/lake_face.png')" />
      <span class="text">湖中面水质</span>
    </div>
    <div class="place-item" :class="{active: lakeSite === 'lakePoint'}" @click="changeLakeSite('lakePoint')">
      <img class="icon" :src="lakeSite === 'lakePoint' ? require('../icons/lake_point_active.png') : require('../icons/lake_point.png')" />
      <span class="text">湖中点水质</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      lakeSite: 'lakeBody'
    }
  },
  methods: {
    ...mapMutations([
      'set_waterQualityLakeSite'
    ]),
    changeLakeSite (type) {
      this.lakeSite = type
      this.set_waterQualityLakeSite(type)
    }
  }
}
</script>

<style lang="less" scoped>
.place-bar {
  position: absolute;
  bottom: 148px;
  left: 745px;
  z-index: 200;
  .place-item {
    margin-top: 28px;
    width: 280px;
    height: 88px;
    text-align: center;
    line-height: 88px;
    color:rgba(171,171,171,1);
    font-size:26px;
    cursor: pointer;
    background-color: rgba(3, 17, 40, 0.5);
    &.active {
      border-left: 1px solid rgba(46,194,231,1);
      color:rgba(56,237,253,1);
      background-image: url('../../../assets/icons/lake_bg_active.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center 36px;
    }
    .icon{
      display: inline-block;
      width: 46px;
      height: 46px;
    }
    .text{
      margin-left: 20px;
      display: inline-block;
      height: 88px;
    }
  }
}
</style>
