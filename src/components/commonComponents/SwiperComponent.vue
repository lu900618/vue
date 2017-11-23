<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in swiperList" :key="item.url" :isFull="isFull" :class="{full:isFull}">
        <img :src="item.img||item.src" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['swiperList', 'isFull']
}
</script>

<style lang="less">
.mint-swipe {
  img {
    // width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
  }
  height: 200px;
}

.full {
  img {
    width: 100%;
  }
}
</style>

