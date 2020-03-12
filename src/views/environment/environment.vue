<template>
  <div class="environment">

  </div>
</template>

<script>
export default {
  data () {
    return {
      doRender: false
    }
  },
  components: {
  },
  mounted () {
    this.doRender = true
  }
}
</script>

<style scoped lang="less">
.environment {
  width: 100%;
  height: 100%;
}
</style>
