<template>
  <div class="pool-bar">
    <div class="bar-wrapper">
      <div class="bar-item" @click="changeBar('poll')" :class="{active: activeItem === 'poll'}">{{ getPollName() }}</div>
      <div class="bar-item" @click="changeBar('year')" :class="{active: activeItem === 'year'}">{{ barData.year }}</div>
      <div class="bar-item" @click="changeBar('type')" :class="{active: activeItem === 'type'}">{{ barData.type }}</div>
      <div class="bar-item" @click="changeBar('typeValue')" :class="{active: activeItem === 'typeValue'}">{{ barData.typeValue }}</div>
    </div>
    <div class="bar-content" v-if="modelActive">
      <div class="item-wrapper">
        <div v-for="item in modelData" :key="item.value" class="item" @click="handleItem(item.value)" :style="{color: item.value === barData[activeItem] ? '#38EDFD' : '#fff'}">{{ item.name }}</div>
      </div>
      <div class="btn-wrapper">
        <span class="btn" @click="handleOk">确 定</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      barData: {
        poll: 'tp',
        year: '2016',
        type: '补水',
        typeValue: '补水'
      },
      activeItem: 'poll',
      pollData: [
        { name: '总磷', value: 'tp' }, { name: '总氮', value: 'tn' }, { name: '温度', value: 'ten' }, { name: 'COD', value: 'cod' }, { name: '叶绿素α', value: 'chla' }
      ],
      yearDate: [
        { name: '2016', value: '2016' }, { name: '2017', value: '2017' }
      ],
      typeData: [
        { name: '补水', value: '补水' }, { name: '除藻', value: '除藻' }
      ],
      valueData: {
        '补水': [{ name: '补水', value: '补水' }],
        '除藻': [{ name: '除藻', value: '除藻' }]
      },
      modelData: [],
      modelActive: false
    }
  },
  methods: {
    ...mapMutations([
      'set_assistPoll', 'set_assistYear', 'set_assistTypeValue'
    ]),
    changeBar (type) {
      if (this.activeItem === type) {
        this.modelActive = !this.modelActive
      } else {
        this.modelActive = true
      }
      if (type === 'poll') {
        this.modelData = this.pollData
        this.activeItem = 'poll'
      } else if (type === 'year') {
        this.modelData = this.yearDate
        this.activeItem = 'year'
      } else if (type === 'type') {
        this.modelData = this.typeData
        this.activeItem = 'type'
      } else if (type === 'typeValue') {
        this.modelData = this.valueData[this.barData.type]
        this.activeItem = 'typeValue'
      }
    },
    handleItem (value) {
      if (this.activeItem === 'poll') {
        this.barData.poll = value
      } else if (this.activeItem === 'year') {
        this.barData.year = value
      } else if (this.activeItem === 'type') {
        this.barData.type = value
      } else if (this.activeItem === 'typeValue') {
        this.barData.typeValue = value
      }
    },
    handleOk () {
      this.set_assistPoll(this.barData.poll)
      this.set_assistYear(this.barData.year)
      this.set_assistTypeValue(this.barData.typeValue)
      this.modelActive = false
    },
    getPollName () {
      var name = ''
      name = (this.pollData.filter(item => item.value === this.barData.poll))[0].name
      return name
    }
  }
}
</script>

<style lang="less" scoped>
.pool-bar {
  z-index: 200;
  position: absolute;
  top: 215px;
  left: 2050px;
  width: 800px;
  height: 68px;
  .bar-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .bar-item {
      line-height: 68px;
      text-align: center;
      flex: 1;
      cursor: pointer;
      font-size:24px;
      font-weight:bold;
      color:rgba(255,255,255,1);
      background: url('../../../assets/icons/pollution.png') center center no-repeat;
      background-size: 100% 100%;
      &.active {
        background: url('../../../assets/icons/pollution_active.png') center center no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .bar-content {
    position: absolute;
    top: 68px;
    left: 0;
    width: 800px;
    height: 192px;
    background:rgba(3,17,40,0.7);
    border-radius:0px 0px 5px 5px;
    .item-wrapper {
      overflow: hidden;
      height: 124px;
      .item {
        float: left;
        cursor: pointer;
        width: 33.33%;
        height: 62px;
        text-align: center;
        line-height: 62px;
        font-size: 20px;
      }
    }
    .btn-wrapper {
      height: 66px;
      border-top: 1px solid rgba(255,255,255,.2);
      text-align: right;
      .btn {
        display: inline-block;
        width:100px;
        height:40px;
        background:rgba(46,194,231,1);
        border-radius:5px;
        color:rgba(255,255,255,1);
        font-size: 20px;
        line-height: 40px;
        text-align: center;
        margin-top: 13px;
        margin-right: 20px;
      }
    }
  }
}
</style>
