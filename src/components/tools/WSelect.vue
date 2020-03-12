<template>
  <div class="xbsjselect">
    <div class="xbsjselect-selectdiv" @click="selectClick">
      <span class="xbsjselect-selectText">{{ currentValue }}</span>
      <button class="xbsjselect-selectButton"></button>
    </div>
    <ul class="xbsjselect-selectOption" v-show="selectshow">
      <li v-for="(ct,index) in listdata" :key="index" @click="selectName(ct)">
        <span :class="{active: ct === currentValue}">{{ ct }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: {
      type: String || Number,
      required: true
    }
  },
  data () {
    return {
      selectshow: false,
      currentValue: this.value
    }
  },
  computed: {
    listdata () {
      return this.list
    }
  },
  methods: {
    selectClick () {
      this.selectshow = !this.selectshow
    },
    selectName (value) {
      this.currentValue = value
      this.selectshow = false
    }
  },
  watch: {
    currentValue (val, old) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped>
.xbsjselect {
  position: relative;
  width: 100%;
}
.xbsjselect-selectdiv {
  display: inline-block;
  width: 100%;
  /* background-color: rgba(25, 30, 40, 0.95); */
  background: transparent;
  height: 50px;
  line-height: 50px;
  position: relative;
  text-align: left;
  color: rgb(230, 247, 255);
  cursor: pointer;
  padding-left: 14px;
  left: -2px;
  top: 2px;
  border-radius: 3px;
}
.active {
  color: #73EBF8;
}
.xbsjselect-selectText {
  font-size: 12px;
}
.xbsjselect-selectButton {
  width: 30px;
  height: 30px;
  border: none;
  background: url('../../assets/icons/xiala.png') center center no-repeat;
  background-size: contain;
  cursor: pointer;
  float: right;
  margin-right: 20px;
  margin-top: 10px;
  outline: none;
}
.xbsjselect-selectOption {
  padding:0;
  width: 100%;
  top: -100px;
  background: rgba(57, 69, 83, 0.9);
  border-radius: 0px 0px 4px 4px;
  list-style: none;
  overflow: auto;
  z-index: 1;
  position: absolute;
}

.xbsjselect-selectOption li {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: rgba(230, 247, 255, 0.7);
  background: rgba(57, 69, 83, 0.9);
  font-size: 18px;
  cursor: pointer;
  margin-top: 2px;
  padding-left: 14px;
}
.xbsjselect-selectOption li:hover {
  background: rgba(107, 107, 107, 1);
}
</style>
