<template>
  <div class="title">
    <div class="text">{{ title }}</div>
    <div class="date">{{ date }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '~../../assets/css/variable.less';

.title {
  width:90%;
  height: 60px;
  margin: 50px auto 0 auto;
  position: relative;
  .panel-bg-title();
  .text {
    font-size: 26px;
    color: #6FEFFB;
    position: absolute;
    top: -10px;
    font-weight:400;
  }
  .date {
    position: absolute;
    top: 5px;
    right: 0px;
    font-size:16px;
    color:rgba(149,156,183,1);
    font-weight:400;
  }
}
</style>
