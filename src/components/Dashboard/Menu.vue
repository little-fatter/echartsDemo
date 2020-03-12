<template>
  <!-- 底部导航切换 -->
  <div class="content_opte" v-show="showMenu">
    <ul>
      <li class="item" @click="changeMenu(1)">
        <img :src="getImg(1)" class="img"/>
        <p class="title" :class="{'active':activeMenu === 1}">综 合 首 页</p>
        <img src="../../assets/icons/select_line.png" class="select_line" :style="{display: activeMenu === 1 ? 'block' : 'none'}">
      </li>
      <li class="item">
        <img :src="getImg(2)" class="img" />
        <p class="title" :class="{'active':activeMenu==2}">环 境 监 管</p>
        <img src="../../assets/icons/select_line.png" class="select_line" :style="{display: activeMenu === 2 ? 'block' : 'none'}">
      </li>
      <li class="item" @click="changeMenu(3)">
        <img :src="getImg(3)" class="img"/>
        <p class="title" :class="{'active':activeMenu === 3}">水 质 反 演</p>
        <img src="../../assets/icons/select_line.png" class="select_line" :style="{display: activeMenu === 3 ? 'block' : 'none'}">
      </li>
      <li class="item" @click="changeMenu(4)">
        <img :src="getImg(4)" class="img"/>
        <p class="title" :class="{'active':activeMenu === 4}">辅 助 决 策</p>
        <img src="../../assets/icons/select_line.png" class="select_line" :style="{display: activeMenu === 4 ? 'block' : 'none'}">
      </li>
      <li class="item">
        <img :src="getImg(5)" class="img"/>
        <p class="title" :class="{'active':activeMenu === 5}">智 能 执 法</p>
        <img src="../../assets/icons/select_line.png" class="select_line" :style="{display: activeMenu === 5 ? 'block' : 'none'}">
      </li>
      <li class="item" @click="changeMenu(6)">
        <img :src="getImg(6)" class="img"/>
        <p class="title" :class="{'active':activeMenu==6}">漫 游</p>
        <img src="../../assets/icons/select_line.png" class="select_line" :style="{display: activeMenu === 6 ? 'block' : 'none'}">
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      activeMenu: 1,
      routesOption: {
        'dashboard': 1,
        'waterQuality': 3,
        'assist': 4,
        'wander': 6
      }
    }
  },
  computed: {
    ...mapGetters([
      'showMenu'
    ])
  },
  created () {
    var routeName = this.$route.name
    this.activeMenu = this.routesOption[routeName]
  },
  methods: {
    ...mapMutations([
      'set_menuIndex'
    ]),
    getImg (index) {
      var src = ''
      if (index === this.activeMenu) {
        src = require('../../assets/icons/menu_' + index + '_active.png')
      } else {
        src = require('../../assets/icons/menu_' + index + '.png')
      }
      return src
    },
    changeMenu (index) {
      this.activeMenu = index
      this.set_menuIndex(index)
      if (index === 1) {
        this.$router.push('/home/dashboard')
      }
      if (index === 3) {
        this.$router.push('/home/waterQuality')
      }
      if (index === 4) {
        this.$router.push('/home/assist')
      }
      if (index === 6) {
        this.$router.push('/home/wander')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content_opte {
  position: absolute;
  pointer-events: auto;
  top: 1407px;
  left: 1195px;
  z-index: 120;
  .item {
    text-align: center;
    width: 410px;
    float: left;
    list-style: none;
    cursor: pointer;
    .img {
      width: 50px;
      height: 50px;
    }
    .title {
      margin-top: 36px;
      font-family: "Microsoft Yahei";
      font-size: 26px;
      color: rgb(230, 247, 255);
    }
    .title.active {
      color: rgb(56, 237, 253);
    }
    .select_line {
      margin-top: -48px;
    }
  }
}
</style>
