<template>
  <div class="cmt-container">
    <div class="title">{{info.title}}</div>
    <hr>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
      info: {}
    }
  },
  created () {
    this.getGoodsDesc()
  },
  methods: {
    getGoodsDesc () {
      this.$http.get('api/goods/getdesc/' + this.id).then(result => {
        if (result.body.status === 0) {
          this.info = result.body.message[0]
        }
      })
    }
  }
}
</script>

<style lang="less">
.cmt-container {
  // padding: 8px;
  .title {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content {
    margin: 15px 0;
    padding: 4px;
    img {
      width: 100%;
    }
  }
}
</style>
