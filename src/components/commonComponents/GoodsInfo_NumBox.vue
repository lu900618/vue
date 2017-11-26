<template>
  <div class="mui-numbox" data-numbox-min="1" :data-number-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox">
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min'

export default {
  mounted () {
    mui('.mui-numbox').numbox()
  },
  methods: {
    /** 文本框数变化的时候，把最新的数据通过事件调用传递给父组件 */
    countChanged () {
      this.$emit('getcount', parseInt(this.$refs.numbox.value))
    }
  },
  props: ['max'],
  watch: {
    // max 是 promise 异步获取的，直接操作标签无效，所以要监听
    'max': function (newVal, oldVal) {
      mui('.mui-numbox').numbox().setOption('max', newVal)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
